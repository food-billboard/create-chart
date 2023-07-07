import { ConnectState } from '@/models/connect';

export const mapStateToProps = (state: ConnectState) => {
  return {
    loggerMode: state.local.loggerMode,
  };
};

export const mapDispatchToProps = (dispatch: any) => ({});
