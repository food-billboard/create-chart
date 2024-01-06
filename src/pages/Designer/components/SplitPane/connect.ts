import { ConnectState } from '@/models/connect';

export const mapStateToProps = (state: ConnectState) => {
  return {
    componentCollapse: state.local.componentCollapse,
    componentSearchCollapse: state.local.componentSearchCollapse,
    layerCollapse: state.local.layerCollapse,
  };
};

export const mapDispatchToProps = (dispatch: any) => ({});
