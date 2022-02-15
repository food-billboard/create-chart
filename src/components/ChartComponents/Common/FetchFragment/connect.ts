import { ConnectState } from '@/models/connect';

export const mapStateToProps = (state: ConnectState) => {
  return {
    params: state.global.screenData.config.attr.params,
    filter: state.global.screenData.config.attr.filter,
  };
};

export const mapDispatchToProps = (dispatch: any) => ({});
