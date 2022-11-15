import { useEffect, useMemo } from 'react';
import { connect } from 'dva';
import { ConnectState } from '@/models/connect';
import { MOBILE_HEIGHT } from '@/utils/constants';

let index = 0;

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
    if (height - componentsHeight < MOBILE_HEIGHT / 2 && type === 'H5') {
      index++;
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
        dispatch({ type: 'global/setScreen', value, init: true }),
    };
  },
)(H5AutoHeight);
