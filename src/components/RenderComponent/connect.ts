import { ConnectState } from '@/models/connect';

export const mapStateToProps = (state: ConnectState) => {
  return {
    select: state.global.select || [],
    scale: state.global.scale,
    screenType: state.global.screenType,
    grid: state.global.screenData.config.attr.grid || 1,
  };
};

export const mapDispatchToProps = (dispatch: any) => ({
  setSelect: (value: any) => dispatch({ type: 'global/setSelect', value }),
  setComponentAll: (value: any) =>
    dispatch({ type: 'global/setComponentAll', value }),
});
