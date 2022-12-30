import { ConnectState } from '@/models/connect';

export const mapStateToProps = (state: ConnectState) => {
  return {};
};

export const mapDispatchToProps = (dispatch: any) => ({
  setVersion: (value: any) => dispatch({ type: 'global/setVersion', value }),
  setGuideLine: (value: any) =>
    dispatch({ type: 'global/setGuideLine', value, init: true }),
  setScale: (value: any) => dispatch({ type: 'global/setScale', value }),
  setScreen: (value: any) =>
    dispatch({ type: 'global/setScreen', value, init: true }),
  setComponentAll: (value: any, enqueue: boolean) =>
    dispatch({ type: 'global/setComponentAll', value, enqueue }),
});
