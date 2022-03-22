import { ConnectState } from '@/models/connect';

export const mapStateToProps = (state: ConnectState) => {
  return {};
};

export const mapDispatchToProps = (dispatch: any) => ({
  forger: (value: any) => dispatch({ type: 'user/forger', payload: value }),
});
