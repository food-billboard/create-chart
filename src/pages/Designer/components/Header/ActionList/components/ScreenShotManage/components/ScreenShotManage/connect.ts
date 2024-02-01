import { ConnectState } from '@/models/connect';

export const mapStateToProps = (state: ConnectState) => {
  return {
    _id: state.global.screenData._id || '',
  };
};

export const mapDispatchToProps = (dispatch: any) => ({});
