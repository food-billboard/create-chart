import { get } from 'lodash';
import { ConnectState } from '@/models/connect';

export const mapStateToProps = (state: ConnectState) => {
  return {
    select: state.global.select,
    clipboard: state.global.clipboard,
    components: state.global.components,
  };
};

export const mapDispatchToProps = (dispatch: any) => ({
  setComponentAll: (value: any) =>
    dispatch({ type: 'global/setComponentAll', value }),
  setSelect: (value: any) => dispatch({ type: 'global/setSelect', value }),
  setClipboard: (value: any) =>
    dispatch({ type: 'global/setClipboard', value }),
  undo: () => dispatch({ type: 'global/undo' }),
  redo: () => dispatch({ type: 'global/redo' }),
});
