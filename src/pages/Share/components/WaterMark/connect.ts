import { ConnectState } from '@/models/connect';

export const mapStateToProps = (state: ConnectState) => {
  return {
    waterMark: state.global.screenData.config.attr.waterMark,
    screenType: state.global.screenType,
  };
};

export const mapDispatchToProps = (dispatch: any) => ({});
