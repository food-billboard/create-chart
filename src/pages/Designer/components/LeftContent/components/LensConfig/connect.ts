import { ConnectState } from '@/models/connect';

export const mapStateToProps = (state: ConnectState) => {
  return {
    lens: state.global.screenData.config.attr.lens,
  };
};

export const mapDispatchToProps = (dispatch: any) => ({
  setScreen: (value: any) => dispatch({ type: 'global/setScreen', value }),
});
