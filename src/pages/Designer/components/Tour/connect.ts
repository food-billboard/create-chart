import { ConnectState } from '@/models/connect';

export const mapStateToProps = (state: ConnectState) => {
  return {
    userId: state.user.currentUser._id || 'TOUR_STATIC_MOCK_USER_ID', // ? 静态版本没有登录,
  };
};

export const mapDispatchToProps = (dispatch: any) => ({});
