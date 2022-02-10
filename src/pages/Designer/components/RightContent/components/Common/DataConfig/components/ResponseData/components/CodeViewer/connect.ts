import { ConnectState } from '@/models/connect';

export const mapStateToProps = (state: ConnectState) => {
  return {
    filter: state.global.screenData.config.attr.filter,
  };
};

export const mapDispatchToProps = (dispatch: any) => ({});
