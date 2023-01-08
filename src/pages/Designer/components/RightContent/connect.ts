import { ConnectState } from '@/models/connect';

export const mapStateToProps = (state: ConnectState) => {
  return {
    components: state.global.components || [],
    select: state.global.select || [],
    componentConfigCollapse: state.local.componentConfigCollapse,
  };
};

export const mapDispatchToProps = (dispatch: any) => ({});
