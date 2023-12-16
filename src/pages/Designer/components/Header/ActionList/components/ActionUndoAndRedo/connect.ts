import { get } from 'lodash';
import { ConnectState } from '@/models/connect';

export const mapStateToProps = (state: ConnectState) => {
  return {
    isUndoDisabled: get(state, 'global.history.isUndoDisabled') ?? true,
    isRedoDisabled: get(state, 'global.history.isRedoDisabled') ?? true,
  };
};

export const mapDispatchToProps = (dispatch: any) => ({
  undo: () => dispatch({ type: 'global/undo' }),
  redo: () => dispatch({ type: 'global/redo' }),
});
