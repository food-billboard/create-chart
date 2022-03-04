import { ConnectState } from '@/models/connect';

export const mapStateToProps = (state: ConnectState) => {
  return {
    select: state.global.select || [],
    screenType: state.global.screenType,
  };
};

export const mapDispatchToProps = (dispatch: any) => ({});
