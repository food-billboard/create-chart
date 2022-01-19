import { ConnectState } from '@/models/connect';

export const mapStateToProps = (state: ConnectState) => {
  return {
    value: state.global.scale,
    pageWidth: state.global.screenData.config.style.width,
    pageHeight: state.global.screenData.config.style.height,
  };
};

export const mapDispatchToProps = (dispatch: any) => ({
  onChange: (value: any) => dispatch({ type: 'global/setScale', value }),
});
