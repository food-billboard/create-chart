import { ConnectState } from '@/models/connect';

export const mapStateToProps = (state: ConnectState) => {
  return {
    constants: state.global.screenData.config.attr.constants || [],
  };
};

export const mapDispatchToProps = (dispatch: any) => ({
  setScreen: (value: any) => dispatch({ type: 'global/setScreen', value }),
});
