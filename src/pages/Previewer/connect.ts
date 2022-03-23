import { ConnectState } from '@/models/connect';

export const mapStateToProps = (state: ConnectState) => {
  return {
    width: state.global.screenData.config.style.width,
    height: state.global.screenData.config.style.height,
  };
};

export const mapDispatchToProps = (dispatch: any) => ({
  setScreenType: (value: any) =>
    dispatch({ type: 'global/setScreenType', value }),
  setScale: (value: any) => dispatch({ type: 'global/setScale', value }),
});
