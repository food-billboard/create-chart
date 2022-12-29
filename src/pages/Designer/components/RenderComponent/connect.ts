import { ConnectState } from '@/models/connect';

export const mapStateToProps = (state: ConnectState) => {
  return {
    scale: state.global.scale,
    screenType: state.global.screenType,
    grid: state.global.screenData.config.attr.grid || 1,
    flag: state.global.screenData.config.flag.type,
  };
};

export const mapDispatchToProps = (dispatch: any) => ({
  setSelect: (value: any) => dispatch({ type: 'global/setSelect', value }),
});
