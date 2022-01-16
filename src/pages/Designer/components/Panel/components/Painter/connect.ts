import { ConnectState } from '@/models/connect';

export const mapStateToProps = (state: ConnectState) => {
  return {
    dragInfo: state.global.drag.value,
  };
};

export const mapDispatchToProps = (dispatch: any) => ({
  setDragInfo: (value: any) =>
    dispatch({ type: 'global/setDragInfo', value: { value } }),
});
