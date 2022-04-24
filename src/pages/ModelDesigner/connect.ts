import { ConnectState } from '@/models/connect';

export const mapStateToProps = (state: ConnectState) => {
  return {};
};

export const mapDispatchToProps = (dispatch: any) => ({
  setScreenType: (value: any) =>
    dispatch({ type: 'global/setScreenType', value }),
});
