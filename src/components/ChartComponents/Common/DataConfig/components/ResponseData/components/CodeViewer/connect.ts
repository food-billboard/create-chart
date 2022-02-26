import { ConnectState } from '@/models/connect';

export const mapStateToProps = (state: ConnectState) => {
  const { filter, params, constants } = state.global.screenData.config.attr;
  return {
    filter,
    params,
    constants,
  };
};

export const mapDispatchToProps = (dispatch: any) => ({});
