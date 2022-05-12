import { ConnectState } from '@/models/connect';

export const mapStateToProps = (state: ConnectState) => {
  return {};
};

export const mapDispatchToProps = (dispatch: any) => ({
  setGuideLine: (value: any) =>
    dispatch({ type: 'global/setGuideLine', value }),
  setScale: (value: any) => dispatch({ type: 'global/setScale', value }),
  setScreen: (value: any) => dispatch({ type: 'global/setScreen', value }),
  setComponentAll: (value: any) =>
    dispatch({ type: 'global/setComponentAll', value }),
});
