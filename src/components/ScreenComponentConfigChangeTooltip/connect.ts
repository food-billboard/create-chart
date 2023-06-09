import { ConnectState } from '@/models/connect';

export const mapStateToProps = (state: ConnectState) => {
  return {
    versionChangeTooltip: state.global.screenData.extra.versionChangeTooltip,
  };
};

export const mapDispatchToProps = (dispatch: any) => ({
  setVersionChangeTooltip: (value: any) =>
    dispatch({
      type: 'global/setScreen',
      value: { extra: { versionChangeTooltip: value } },
    }),
});
