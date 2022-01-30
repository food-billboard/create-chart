import { ConnectState } from '@/models/connect';

export const mapStateToProps = (state: ConnectState) => {
  return {
    screenData: state.global.screenData,
  };
};

export const mapDispatchToProps = (dispatch: any) => ({
  setScreenData: (value: any) => dispatch({ type: 'global/setScreen', value }),
});
