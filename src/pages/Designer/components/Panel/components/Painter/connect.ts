import { ConnectState } from '@/models/connect';

export const mapStateToProps = (state: ConnectState) => {
  return {
    dragInfo: state.global.drag,
    config: state.global.screenData.config,
    scale: state.global.scale,
  };
};

export const mapDispatchToProps = (dispatch: any) => ({
  setDragInfo: (value: any) => dispatch({ type: 'global/setDragInfo', value }),
  setSelect: (value: any) => dispatch({ type: 'global/setSelect', value }),
  setComponent: (value: any) =>
    dispatch({ type: 'global/setComponent', value }),
});
