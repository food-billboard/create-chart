import { ConnectState } from '@/models/connect';

export const mapStateToProps = (state: ConnectState) => {
  return {
    select: state.global.select || [],
    scale: state.global.scale,
    screenType: state.global.screenType,
  };
};

export const mapDispatchToProps = (dispatch: any) => ({
  setSelect: (value: any) => dispatch({ type: 'global/setSelect', value }),
  setComponent: (value: any) =>
    dispatch({ type: 'global/setComponent', value }),
});
