import { ConnectState } from '@/models/connect';

export const mapStateToProps = (state: ConnectState) => {
  return {
    components: state.global.components || [],
    flag: state.global.screenData.config.flag.type,
    select: state.global.select,
  };
};

export const mapDispatchToProps = (dispatch: any) => ({
  setComponentAll: (value: any) =>
    dispatch({ type: 'global/setComponentAll', value }),
  setSelect: (value: any) => dispatch({ type: 'global/setSelect', value }),
});
