import { ConnectState } from '@/models/connect';

export const mapStateToProps = (state: ConnectState) => {
  return {
    components: state.global.components,
  };
};

export const mapDispatchToProps = (dispatch: any) => ({});
