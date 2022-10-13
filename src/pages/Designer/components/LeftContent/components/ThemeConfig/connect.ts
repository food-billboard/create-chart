import { ConnectState } from '@/models/connect';

export const mapStateToProps = (state: ConnectState) => {
  return {
    theme: state.global.screenData.config.attr.theme,
  };
};

export const mapDispatchToProps = (dispatch: any) => ({
  setScreen: (value: any) => dispatch({ type: 'global/setScreen', value }),
  setComponent: (value: any) =>
    dispatch({ type: 'global/setComponent', value }),
});
