import { App } from 'antd';
import { get } from 'lodash';
import { nanoid } from 'nanoid';
import { forwardRef, useEffect, useImperativeHandle } from 'react';
import { connect } from 'umi';
import { mergeComponentDefaultConfig } from '@/components/ChartComponents';
import { useIsModelHash, useThemeChange } from '@/hooks';
import { getScreenDetail, getScreenModelDetail } from '@/services';
import { getLocationQuery, isDesignerPage, sleep } from '@/utils';
import BreakingChange from '@/utils/Assist/BreakingChange';
import GlobalConfig from '@/utils/Assist/GlobalConfig';
import LocalConfigInstance, { LocalConfig } from '@/utils/Assist/LocalConfig';
import ThemeUtil, { InitThemeDataParams } from '@/utils/Assist/Theme';
import { SCREEN_VERSION } from '@/utils/constants';
import DEFAULT_SCREEN_DATA, {
  createScreenDataRequest,
  DEFAULT_VERSION_CHANGE_TOOLTIP,
  DEFAULT_THEME_DATA,
} from '@/utils/constants/screenData';
import { autoFitScale } from '../Panel/components/ToolBar/components/Scale';
import { mapDispatchToProps, mapStateToProps } from './connect';

export type FetchScreenComponentRef = {
  reload: () => Promise<any>;
};

const FetchScreenComponent = forwardRef<
  FetchScreenComponentRef,
  {
    fetchScreenShot?: boolean;
    needFetch?: boolean;
    onLoad?: () => void;
    setScale?: (scale: number) => void;
    setVersion: (value: string) => void;
    setScreen: (value: ComponentMethod.GlobalUpdateScreenDataParams) => void;
    setComponentAll: (
      value: ComponentData.TComponentData[],
      enqueue: boolean,
    ) => void;
    setGuideLine: (value: ComponentData.TGuideLineConfig) => void;
  }
>((props, ref) => {
  const {
    setScreen,
    setComponentAll,
    needFetch = true,
    setScale,
    setGuideLine,
    setVersion,
    onLoad,
    fetchScreenShot = false,
  } = props;

  const { message, modal } = App.useApp();

  const isModel = useIsModelHash();

  useThemeChange();

  const themeSet = async (themeConfig: InitThemeDataParams) => {
    if (isDesignerPage()) {
      await ThemeUtil.initCurrentThemeData(themeConfig);
    } else {
      await ThemeUtil.initCurrentThemeDataAndUpdateScreenData({
        ...themeConfig,
        needNotRequest: true,
      });
    }
  };

  const parseComponentAndSaveData = async (
    screenData: ComponentData.TScreenData,
    version: string,
  ) => {
    const realScreenData: ComponentData.TScreenData = BreakingChange(
      screenData,
      version,
    );
    const { components: componentsList, ...nextData } = realScreenData;
    const theme = get(nextData, 'config.attr.theme');

    // ! 下面的主题设置如果有问题就放在这里再试试
    // ? 放在下面的原因是主题设置存在覆盖的需求，需要更改大屏的数据，所以就先设置数据然后再设置主题

    setScreen({
      ...nextData,
    });
    setVersion(version);
    setGuideLine(nextData.config.attr.guideLine || { value: [], show: true });

    const mergedComponentList = mergeComponentDefaultConfig(componentsList);
    setComponentAll(mergedComponentList, false);

    await themeSet({
      themeConfig: theme,
      registerTheme: true,
      force: true,
    });

    return realScreenData;
  };

  const commonScreenDataSet = async ({
    fetchData,
    isReload,
    onNotFoundData,
  }: {
    // 获取数据
    fetchData: () => Promise<
      { version: string; screenData: ComponentData.TScreenData } | undefined
    >;
    // 是否需要reload
    isReload?: boolean;
    onNotFoundData?: (
      defaultScreenData: ComponentData.TScreenData,
    ) => Promise<void>;
  }) => {
    let width;
    let height;
    let flag;
    const { width: defaultWidth, height: defaultHeight } = get(
      DEFAULT_SCREEN_DATA,
      'config.style',
    );
    width = defaultWidth;
    height = defaultHeight;

    try {
      const data = await fetchData();
      if (data) {
        const { version, screenData } = data;
        const realScreenData = await parseComponentAndSaveData(
          screenData,
          version,
        );
        width = realScreenData.config.style.width;
        height = realScreenData.config.style.height;
        flag = realScreenData.config.flag.type;
      } else {
        const DEFAULT_SCREEN_DATA = createScreenDataRequest({
          name: 'screen',
          flag: 'PC',
          extra: {
            version: SCREEN_VERSION(),
            _id: nanoid(),
          },
        });

        await onNotFoundData?.(
          DEFAULT_SCREEN_DATA as ComponentData.TScreenData,
        );

        // 先注册主题色再修改数据
        await themeSet({
          themeConfig: DEFAULT_THEME_DATA,
          registerTheme: true,
          force: true,
        });

        if (isReload) {
          setComponentAll([], false);
          setGuideLine({
            show: true,
            value: [],
          });
        }
        // 添加新增独有的tooltip配置
        setScreen({
          ...DEFAULT_SCREEN_DATA,
          extra: {
            // @ts-ignore
            ...DEFAULT_SCREEN_DATA.extra,
            versionChangeTooltip: DEFAULT_VERSION_CHANGE_TOOLTIP,
          },
        });
      }
    } catch (err) {
      console.error(err);
      message.info('数据获取失败');
    }

    const result = autoFitScale(width, height, flag);
    setScale?.(result);

    await sleep(1000);

    onLoad?.();
  };

  // 前端大屏数据获取
  const fetchData4Local = async (params: {
    // 本地存储的key
    localKey: string;
    // 是否需要reload
    isReload?: boolean;
    // 是否需要在未存在值的情况下初始化
    needCache?: boolean;
    // 是否获取快照
    fetchScreenShot?: boolean;
  }) => {
    const {
      localKey,
      isReload = false,
      needCache = true,
      fetchScreenShot = false,
    } = params;

    return commonScreenDataSet({
      fetchData: async () => {
        async function fetch(
          fetchScreenShot?: boolean,
        ): Promise<{ errMsg?: any; value?: any }> {
          if (fetchScreenShot) {
            // * 本地获取快照只可能是static版本大屏
            // * 1 先获取大屏快照
            // * 2 获取不到则获取大屏详情
            const { errMsg, value } = await LocalConfigInstance.getItem(
              LocalConfig.STATIC_SCREEN_SHOT_SAVE_KEY,
            );
            if (errMsg || !value) return fetch(false);
            // ? 目前(1.22)静态版本为单个大屏的模式，所以直接取对象中的唯一key即可
            const [screenId] = Object.keys(value);
            if (!screenId) return fetch(false);
            const targetScreenShotData = (
              value[screenId] as API_IMPROVE.LocalScreenShotDataValue[]
            ).find((item) => item.isUse);
            if (!targetScreenShotData) return fetch(false);
            return {
              errMsg: false,
              value: {
                ...targetScreenShotData.value,
                version: targetScreenShotData.version,
              },
            };
          } else {
            return LocalConfigInstance.getItem(localKey);
          }
        }

        const data = await fetch(fetchScreenShot);

        if (!data.errMsg && data.value) {
          const { version, ...baseScreenData } = data.value;
          return {
            version,
            screenData: baseScreenData,
          };
        }
      },
      isReload,
      onNotFoundData: async (defaultScreenData) => {
        if (needCache) {
          await LocalConfigInstance.setItem(localKey, defaultScreenData);
        }
      },
    });
  };

  // 静态大屏数据
  const fetchData4Static = async (isReload: boolean = false) => {
    return fetchData4Local({
      localKey: LocalConfig.STATIC_COMPONENT_DATA_SAVE_KEY,
      isReload,
      needCache: true,
      fetchScreenShot,
    });
  };

  // 普通获取数据
  const fetchDataNormal = async (isReload: boolean = false) => {
    return commonScreenDataSet({
      fetchData: async () => {
        const { id } = getLocationQuery() || {};
        if (!id) return;
        let method: any;
        if (GlobalConfig.IS_IMPROVE_BACKEND) {
          // !这里是要改过的，improve的接口还未提供
          if (isModel) {
            method = getScreenModelDetail;
          } else if (fetchScreenShot) {
            method = getScreenDetail;
          } else {
            method = getScreenDetail;
          }
        } else {
          method = isModel ? getScreenModelDetail : getScreenDetail;
        }

        const data = await method({
          _id: id,
        });
        const { components, _id, version } = data;
        return {
          version,
          screenData: {
            ...components,
            _id: components._id || _id,
          },
        };
      },
      isReload,
    });
  };

  // improve获取数据
  const fetchDataImprove = async (isReload: boolean = false) => {
    try {
      const { id } = getLocationQuery() || {};
      const cacheKey =
        LocalConfig.IMPROVE_BACKEND_STATIC_COMPONENT_DATA_SAVE_PREFIX + id;
      const localData = await LocalConfigInstance.getItem(cacheKey);
      if (!localData.errMsg && localData.value && !fetchScreenShot) {
        return new Promise<void>((resolve) => {
          modal.confirm({
            title: '提示',
            content: '本地电脑存在未保存的记录，是否加载该记录',
            okText: '使用本地记录',
            cancelText: '使用保存记录',
            maskClosable: false,
            onCancel: async () => {
              await LocalConfigInstance.removeItem(cacheKey);
              await fetchDataNormal(isReload);
              resolve();
            },
            onOk: async () => {
              await fetchData4Local({
                localKey: cacheKey,
                isReload,
                needCache: true,
              });
              resolve();
            },
          });
        });
      }
      return fetchDataNormal(isReload);
    } catch (err) {}
  };

  const fetchData = (isReload: boolean = false) => {
    if (GlobalConfig.IS_STATIC) {
      return fetchData4Static(isReload);
    } else if (GlobalConfig.IS_IMPROVE_BACKEND) {
      return fetchDataImprove(isReload);
    } else {
      return fetchDataNormal(isReload);
    }
  };

  useImperativeHandle(
    ref,
    () => {
      return {
        reload: fetchData.bind(null, true),
      };
    },
    [],
  );

  useEffect(() => {
    if (needFetch) {
      fetchData();
    }
  }, [needFetch, fetchScreenShot]);

  return <></>;
});

export default connect(mapStateToProps, mapDispatchToProps, undefined, {
  forwardRef: true,
})(FetchScreenComponent);
