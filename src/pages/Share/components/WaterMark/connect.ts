import { ConnectState } from '@/models/connect';

export const mapStateToProps = (state: ConnectState) => {
  return {
    waterMark: state.global.screenData.config.attr.waterMark,
  };
};

export const mapDispatchToProps = (dispatch: any) => ({});
