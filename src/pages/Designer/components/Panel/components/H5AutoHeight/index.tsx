import { useEffect, useMemo } from 'react';
import { connect } from 'dva';
import { ConnectState } from '@/models/connect';
import { MOBILE_HEIGHT } from '@/utils/constants';

const H5AutoHeight = (props: {
  config: ComponentData.TScreenData['config'];
  components: ComponentData.TComponentData[];
  setScreenData: (value: ComponentMethod.GlobalUpdateScreenDataParams) => void;
}) => {
  const {
    config: {
      style: { height },
      flag: { type },
    },
    components,
    setScreenData,
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
    if (componentsHeight - height < MOBILE_HEIGHT / 2 && type === 'H5') {
      setScreenData({
        config: {
          style: {
            height: height + MOBILE_HEIGHT,
          },
        },
      });
    }
  }, [componentsHeight, height, type]);

  return <></>;
};

export default connect(
  (state: ConnectState) => {
    return {
      config: state.global.screenData.config,
      components: state.global.components,
    };
  },
  (dispatch) => {
    return {
      setScreenData: (value: any) =>
        dispatch({ type: 'global/setScreen', value }),
    };
  },
)(H5AutoHeight);
