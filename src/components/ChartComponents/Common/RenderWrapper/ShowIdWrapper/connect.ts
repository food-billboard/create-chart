import { ConnectState } from '@/models/connect';

export const mapStateToProps = (state: ConnectState) => {
  return {
    debug: state.local.debug,
    screenType: state.global.screenType,
  };
};

export const mapDispatchToProps = () => ({});
