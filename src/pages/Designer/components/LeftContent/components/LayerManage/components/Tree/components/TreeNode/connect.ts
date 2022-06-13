import { ConnectState } from '@/models/connect';

export const mapStateToProps = (state: ConnectState) => {
  return {};
};

export const mapDispatchToProps = (dispatch: any) => ({
  setHoverSelect: (value: any) =>
    dispatch({ type: 'global/setHoverSelect', value }),
});
