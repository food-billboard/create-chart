import { useEffect, forwardRef, useImperativeHandle } from 'react';
import { connect } from 'dva';
import { message } from 'antd';
import { get } from 'lodash';
import { history } from 'umi';
import ThemeUtil from '@/utils/Assist/Theme';
import { DEFAULT_SCREEN_DATA } from '@/utils/constants';
import { useIsModelHash } from '@/hooks';
import { getScreenDetail, getScreenModelDetail } from '@/services';
import { sleep } from '@/utils';
import BreakingChange from '@/utils/Assist/BreakingChange';
import { mergeComponentDefaultConfig } from '@/components/ChartComponents';
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
        const {
          components: componentsList,
          ...nextData
        }: ComponentData.TScreenData = BreakingChange(components, version);
        // 先注册主题色再修改数据
        ThemeUtil.initCurrentThemeData(nextData.config.attr.theme);
        setScreen({
          ...nextData,
          _id: id,
        });
        setVersion(version);
        setGuideLine(
          nextData.config.attr.guideLine || { value: [], show: true },
        );
        width = nextData.config.style.width;
        height = nextData.config.style.height;
        flag = nextData.config.flag.type;

        const mergedComponentList = mergeComponentDefaultConfig(componentsList);
        setComponentAll(mergedComponentList, false);
      } catch (err) {
        message.info('数据获取失败');
      }
    } else if (isReload) {
      setComponentAll([], false);
      setGuideLine({
        show: true,
        value: [],
      });
      setScreen(DEFAULT_SCREEN_DATA);
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
        reload: fetchData.bind(null, true),
      };
    },
    [],
  );

  useEffect(() => {
    needFetch && fetchData();
  }, [needFetch]);

  return <></>;
});

export default connect(mapStateToProps, mapDispatchToProps, null, {
  forwardRef: true,
})(FetchScreenComponent);
