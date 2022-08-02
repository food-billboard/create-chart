import { ConnectState } from '@/models/connect';

export const mapStateToProps = (state: ConnectState) => {
  return {
    components: state.global.components || [],
    clipboard: state.global.clipboard,
  };
};

export const mapDispatchToProps = (dispatch: any) => ({
  setComponentAll: (value: any) =>
    dispatch({ type: 'global/setComponentAll', value }),
  setSelect: (value: any) => dispatch({ type: 'global/setSelect', value }),
  setClipboard: (value: any) =>
    dispatch({ type: 'global/setClipboard', value }),
});
