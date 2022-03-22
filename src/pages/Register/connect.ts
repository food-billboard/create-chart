import { ConnectState } from '@/models/connect';

export const mapStateToProps = (state: ConnectState) => {
  return {};
};

export const mapDispatchToProps = (dispatch: any) => ({
  register: (value: any) => dispatch({ type: 'user/register', payload: value }),
});
