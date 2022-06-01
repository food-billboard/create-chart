import { ConnectState } from '@/models/connect';

export const mapStateToProps = (state: ConnectState) => {
  return {
    components: state.global.components || [],
    select: state.global.select || [],
  };
};

export const mapDispatchToProps = (dispatch: any) => ({
  setComponent: (value: any) =>
    dispatch({ type: 'global/setComponent', value }),
  setSelect: (value: any) => dispatch({ type: 'global/setSelect', value }),
});
