import { ConnectState } from '@/models/connect';

export const mapStateToProps = (state: ConnectState) => {
  return {
    select: state.global.select || [],
    screenType: state.global.screenType,
    version: state.global.version || '',
  };
};

export const mapDispatchToProps = () => ({});
