import { get } from 'lodash';
import { ConnectState } from '@/models/connect';

export const mapStateToProps = (state: ConnectState) => {
  return {
    guideLineList: get(state, 'global.guideLine.value') || [],
    guideLineShow: get(state, 'global.guideLine.show') ?? false,
    width: get(state, 'global.screenData.config.style.width'),
    height: get(state, 'global.screenData.config.style.height'),
  };
};

export const mapDispatchToProps = (dispatch: any) => ({
  setGuideLine: (value: any) =>
    dispatch({ type: 'global/setGuideLine', value }),
});
