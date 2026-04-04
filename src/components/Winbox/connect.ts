import { ConnectState } from '@/models/connect';

export const mapStateToProps = (state: ConnectState) => {
  return {
    scale: state.global.scale,
    screenType: state.global.screenType,
  };
};

export const mapDispatchToProps = (dispatch: any) => ({});
