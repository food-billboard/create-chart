import { useEffect, forwardRef, useImperativeHandle } from 'react';
import { connect } from 'dva';
import { message } from 'antd';
import { get } from 'lodash';
import { history } from 'umi';
import { nanoid } from 'nanoid';
import ThemeUtil, { DEFAULT_THEME_NAME } from '@/utils/Assist/Theme';
import { useIsModelHash } from '@/hooks';
import { getScreenDetail, getScreenModelDetail } from '@/services';
import { sleep } from '@/utils';
import BreakingChange from '@/utils/Assist/BreakingChange';
import GlobalConfig from '@/utils/Assist/GlobalConfig';
import { SCREEN_VERSION } from '@/utils/constants';
import LocalConfigInstance, { LocalConfig } from '@/utils/Assist/LocalConfig';
import { mergeComponentDefaultConfig } from '@/components/ChartComponents';
import DEFAULT_SCREEN_DATA, {
  createScreenDataRequest,
} from '@/utils/constants/screenData';
import { autoFitScale } from '../Panel/components/ToolBar/components/Scale';
import { mapStateToProps, mapDispatchToProps } from './connect';

export type FetchScreenComponentRef = {
  reload: () => Promise<any>;
};

const FetchScreenComponent = forwardRef<
  FetchScreenComponentRef,
  {
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
  } = props;

  const isModel = useIsModelHash();

  const parseComponentData = async (
    screenData: ComponentData.TScreenData,
    version: string,
  ) => {
    const realScreenData: ComponentData.TScreenData = BreakingChange(
      screenData,
      version,
    );
    const { components: componentsList, ...nextData } = realScreenData;
    // 先注册主题色再修改数据
    await ThemeUtil.initCurrentThemeData(
      nextData.config.attr.theme,
      true,
      true,
    );
    setScreen({
      ...nextData,
    });
    setVersion(version);
    setGuideLine(nextData.config.attr.guideLine || { value: [], show: true });

    const mergedComponentList = mergeComponentDefaultConfig(componentsList);
    setComponentAll(mergedComponentList, false);

    return realScreenData;
  };

  // 前端大屏数据获取
  const fetchData4Static = async (isReload: boolean = false) => {
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
      const data = await LocalConfigInstance.getItem(
        LocalConfig.STATIC_COMPONENT_DATA_SAVE_KEY,
      );
      if (!data.errMsg && data.value) {
        const { version, ...baseScreenData } = data.value;
        const screenData = await parseComponentData(baseScreenData, version);
        width = screenData.config.style.width;
        height = screenData.config.style.height;
        flag = screenData.config.flag.type;
      } else {
        const DEFAULT_SCREEN_DATA = createScreenDataRequest({
          name: 'screen',
          flag: 'PC',
          extra: {
            version: SCREEN_VERSION,
            _id: nanoid(),
          },
        });
        // 先注册主题色再修改数据
        await ThemeUtil.initCurrentThemeData(DEFAULT_THEME_NAME, true, true);
        await LocalConfigInstance.setItem(
          LocalConfig.STATIC_COMPONENT_DATA_SAVE_KEY,
          DEFAULT_SCREEN_DATA,
        );
        if (isReload) {
          setComponentAll([], false);
          setGuideLine({
            show: true,
            value: [],
          });
        }
        setScreen(DEFAULT_SCREEN_DATA);
      }
    } catch (err) {
      console.error(err);
    }

    const result = autoFitScale(width, height, flag);
    setScale?.(result);

    await sleep(1000);

    onLoad?.();
  };

  const fetchData = async (isReload: boolean = false) => {
    let width;
    let height;
    let flag;
    const { width: defaultWidth, height: defaultHeight } = get(
      DEFAULT_SCREEN_DATA,
      'config.style',
    );
    width = defaultWidth;
    height = defaultHeight;
    const {
      location: { query },
    } = history;
    const { id } = (query as any) || {};

    // fetchData
    if (id) {
      try {
        const method = isModel ? getScreenModelDetail : getScreenDetail;
        const data = await method({
          _id: id,
        });
        const { components, version } = data;
        const screenData = await parseComponentData(components, version);
        width = screenData.config.style.width;
        height = screenData.config.style.height;
        flag = screenData.config.flag.type;
      } catch (err) {
        message.info('数据获取失败');
      }
    } else {
      // 先注册主题色再修改数据
      await ThemeUtil.initCurrentThemeData(DEFAULT_THEME_NAME);
      if (isReload) {
        setComponentAll([], false);
        setGuideLine({
          show: true,
          value: [],
        });
        setScreen(DEFAULT_SCREEN_DATA);
      }
    }

    const result = autoFitScale(width, height, flag);
    setScale?.(result);

    await sleep(1000);

    onLoad?.();
  };

  useImperativeHandle(
    ref,
    () => {
      return {
        reload: GlobalConfig.IS_STATIC
          ? fetchData4Static.bind(null, true)
          : fetchData.bind(null, true),
      };
    },
    [],
  );

  useEffect(() => {
    if (needFetch) {
      GlobalConfig.IS_STATIC ? fetchData4Static() : fetchData();
    }
  }, [needFetch]);

  return <></>;
});

export default connect(mapStateToProps, mapDispatchToProps, null, {
  forwardRef: true,
})(FetchScreenComponent);
