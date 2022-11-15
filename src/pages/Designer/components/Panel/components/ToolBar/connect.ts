import { ConnectState } from '@/models/connect';

export const mapStateToProps = (state: ConnectState) => {
  return {
    flag: state.global.screenData.config.flag.type,
  };
};

export const mapDispatchToProps = (dispatch: any) => ({});
