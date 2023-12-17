import { ConnectState } from '@/models/connect';

export const mapStateToProps = (state: ConnectState) => {
  return {
    request: state.global.screenData.config.attr.request,
  };
};

export const mapDispatchToProps = (dispatch: any) => ({
  setScreen: (value: any) => dispatch({ type: 'global/setScreen', value }),
});
