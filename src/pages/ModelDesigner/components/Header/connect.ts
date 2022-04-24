import { ConnectState } from '@/models/connect';

export const mapStateToProps = (state: ConnectState) => {
  return {
    screenData: state.global.screenData,
    components: state.global.components,
  };
};

export const mapDispatchToProps = (dispatch: any) => ({
  setScreen: (value: any) => dispatch({ type: 'global/setScreen', value }),
});
