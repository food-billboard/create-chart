import { ConnectState } from '@/models/connect';

export const mapStateToProps = (state: ConnectState) => {
  return {
    scale: state.global.scale,
  };
};

export const mapDispatchToProps = (dispatch: any) => ({});
