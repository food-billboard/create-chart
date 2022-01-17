import { ConnectState } from '@/models/connect';

export const mapStateToProps = (state: ConnectState) => {
  return {
    callback: state.global.screenData.config.attr.filter || [],
  };
};

export const mapDispatchToProps = (dispatch: any) => ({
  setCallbackData: (value: any) =>
    dispatch({ type: 'global/setCallbackData', value }),
});
