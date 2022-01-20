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
    return this.history.history.past.length;
  }

  get isRedoDisabled() {
    return this.history.history.future.length;
  }

  enqueue = (
    globalValue: ConnectState['global'],
    state: ComponentData.TComponentData[],
    prevState?: ComponentData.TComponentData[],
  ) => {
    this.history.enqueue(state, prevState);

    set(globalValue, 'history.isUndoDisabled', this.isUndoDisabled);
    set(globalValue, 'history.isRedoDisabled', this.isRedoDisabled);
  };

  undo = () => {
    return this.history.undo();
  };

  redo = () => {
    return this.history.redo();
  };
}
