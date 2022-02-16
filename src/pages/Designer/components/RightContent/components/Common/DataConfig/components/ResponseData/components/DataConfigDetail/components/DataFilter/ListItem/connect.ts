import { ConnectState } from '@/models/connect';

export const mapStateToProps = (state: ConnectState) => {
  const { constants, params } = state.global.screenData.config.attr;
  return {
    params,
    constants,
  };
};

export const mapDispatchToProps = (dispatch: any) => ({});
