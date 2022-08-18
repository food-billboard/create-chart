import { ConnectState } from '@/models/connect';

export const mapStateToProps = (state: ConnectState) => {
  const { width, height } = state.global.screenData.config.style;
  return {
    width,
    height,
    components: state.global.components,
  };
};

export const mapDispatchToProps = (dispatch: any) => ({});
