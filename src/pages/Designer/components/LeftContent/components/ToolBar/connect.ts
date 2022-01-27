import { get } from 'lodash';
import { ConnectState } from '@/models/connect';

export const mapStateToProps = (state: ConnectState) => {
  return {
    guideLineShow: get(state, 'global.guideLine.show') ?? false,
    guideLineData: get(state, 'global.guideLine'),
    isUndoDisabled: get(state, 'global.history.isUndoDisabled') ?? true,
    isRedoDisabled: get(state, 'global.history.isRedoDisabled') ?? true,
  };
};

export const mapDispatchToProps = (dispatch: any) => ({
  setGuideLine: (value: any) =>
    dispatch({ type: 'global/setGuideLine', value }),
  undo: () => dispatch({ type: 'global/undo' }),
  redo: () => dispatch({ type: 'global/redo' }),
});
