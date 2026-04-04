import { ConnectState } from '@/models/connect';

export const mapStateToProps = (state: ConnectState) => {
  return {
    params: state.global.screenData.config.attr.params,
  };
};

export const mapDispatchToProps = (dispatch: any) => ({
  setParams: (value: any, changeValue: any) =>
    dispatch({ type: 'global/setParams', value, changeValue }),
});
