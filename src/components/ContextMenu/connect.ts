import { ConnectState } from '@/models/connect';

export const mapStateToProps = (state: ConnectState) => {
  return {
    select: state.global.select || [],
    components: state.global.components || [],
  };
};

export const mapDispatchToProps = (dispatch: any) => ({
  setComponent: (value: any) =>
    dispatch({ type: 'global/setComponent', value }),
  setComponentAll: (value: any) =>
    dispatch({ type: 'global/setCompsetComponentAllonent', value }),
  setSelect: (value: any) => dispatch({ type: 'global/setSelect', value }),
});
