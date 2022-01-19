import { ConnectState } from '@/models/connect';

export const mapStateToProps = (state: ConnectState) => {
  return {};
};

export const mapDispatchToProps = (dispatch: any) => ({
  setScale: (value: any) => dispatch({ type: 'global/setScale', value }),
});
