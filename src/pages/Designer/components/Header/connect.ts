import { ConnectState } from '@/models/connect';

export const mapStateToProps = (state: ConnectState) => {
  return {
    name: state.global.screenData.name,
  };
};

export const mapDispatchToProps = (dispatch: any) => ({
  setScreenName: (value: string) =>
    dispatch({ type: 'global/setScreenName', value }),
});
