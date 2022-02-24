import { ConnectState } from '@/models/connect';

export const mapStateToProps = (state: ConnectState) => {
  return {
    components: state.global.components,
    guideLine: state.global.guideLine,
    scale: state.global.scale,
  };
};

export const mapDispatchToProps = (dispatch: any) => ({
  setGuideLine: (value: any) =>
    dispatch({ type: 'global/setGuideLine', value }),
  setComponent: (value: any) =>
    dispatch({ type: 'global/setComponent', value }),
});
