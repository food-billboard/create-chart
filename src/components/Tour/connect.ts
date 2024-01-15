import { ConnectState } from '@/models/connect';

export const mapStateToProps = (state: ConnectState) => {
  return {
    userId: state.user.currentUser._id,
  };
};

export const mapDispatchToProps = (dispatch: any) => ({});
