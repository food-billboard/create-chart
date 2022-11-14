import { ConnectState } from '@/models/connect';

export const mapStateToProps = (state: ConnectState) => {
  return {
    components: state.global.components || [],
    exchangeMobileTemplateComponents:
      state.global.exchangeMobileTemplateComponents,
  };
};

export const mapDispatchToProps = (dispatch: any) => ({});
