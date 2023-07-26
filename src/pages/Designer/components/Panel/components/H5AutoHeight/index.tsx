import { ConnectState } from '@/models/connect';
import { MOBILE_HEIGHT } from '@/utils/constants';
import { useEffect, useMemo } from 'react';
import { connect } from 'umi';

const H5AutoHeight = (props: {
  config: ComponentData.TScreenData['config'];
  components: ComponentData.TComponentData[];
  setScreenData: (value: ComponentMethod.GlobalUpdateScreenDataParams) => void;
  screenType: ComponentData.ScreenType;
}) => {
  const {
    config: {
      style: { height },
      flag: { type },
    },
    components,
    setScreenData,
    screenType,
  } = props;

  const componentsHeight = useMemo(() => {
    return components.reduce((acc, cur) => {
      const {
        config: {
          style: { height },
        },
      } = cur;
      acc += height;
      return acc;
    }, 0);
  }, [components]);

  useEffect(() => {
    if (
      screenType !== 'preview' &&
      height - componentsHeight < MOBILE_HEIGHT / 2 &&
      type === 'H5'
    ) {
      setScreenData({
        config: {
          style: {
            height: height + MOBILE_HEIGHT,
          },
        },
      });
    }
  }, [componentsHeight, height, type, screenType]);

  return <></>;
};

export default connect(
  (state: ConnectState) => {
    return {
      config: state.global.screenData.config,
      components: state.global.components,
      screenType: state.global.screenType,
    };
  },
  (dispatch: any) => {
    return {
      setScreenData: (value: any) =>
        dispatch({ type: 'global/setScreen', value, init: true }),
    };
  },
)(H5AutoHeight);
