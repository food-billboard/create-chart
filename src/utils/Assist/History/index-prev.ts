import { set } from 'lodash';
import UndoHistory from 'react-undo-component/lib/Component/history';
import { ConnectState } from '@/models/connect';

export class HistoryUtil {
  constructor() {
    this.history = new UndoHistory<ComponentData.TComponentData[]>({
      limit: 10,
      debug: false,
    });
  }

  history: UndoHistory<ComponentData.TComponentData[]>;

  get isUndoDisabled() {
    return !this.history.history.past.length;
  }

  get isRedoDisabled() {
    return !this.history.history.future.length;
  }

  isFirst = true;

  enqueue = (
    globalValue: ConnectState['global'],
    state: ComponentData.TComponentData[],
    prevState?: ComponentData.TComponentData[],
  ) => {
    this.history.enqueue(state, prevState);

    set(globalValue, 'history.isUndoDisabled', this.isUndoDisabled);
    set(globalValue, 'history.isRedoDisabled', this.isRedoDisabled);
    return globalValue;
  };

  undo = (globalValue: ConnectState['global']) => {
    const result = this.history.undo();
    set(globalValue, 'history.isUndoDisabled', this.isUndoDisabled);
    set(globalValue, 'history.isRedoDisabled', this.isRedoDisabled);
    if (this.history.isActionDataValid(result)) {
      set(globalValue, 'components', result);
    }
    return globalValue;
  };

  redo = (globalValue: ConnectState['global']) => {
    const result = this.history.redo();
    set(globalValue, 'history.isUndoDisabled', this.isUndoDisabled);
    set(globalValue, 'history.isRedoDisabled', this.isRedoDisabled);
    if (this.history.isActionDataValid(result)) {
      set(globalValue, 'components', result);
    }
    return globalValue;
  };
}
