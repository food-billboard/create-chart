import UndoHistory from 'react-undo-component/lib/Component/history';
import { set, get, merge } from 'lodash';
import { DEFAULT_SCREEN_DATA, ThemeMap } from '@/utils/constants';

type DragData = {
  value: ComponentData.BaseComponentItem | null;
};
interface IGlobalModelState {
  screenData: Exclude<ComponentData.TScreenData, 'components'>;
  components: ComponentData.TScreenData['components'];
  guideLine: ComponentData.TGuideLineConfig;
  select: string[];
  componentSelect: ComponentData.TComponentData<any> | null;
  history: UndoHistory;
  theme: ThemeMap;
  clipboard: ComponentData.TComponentData<any>[];

  drag: DragData;
}

export { IGlobalModelState };

export default {
  namespace: 'global',

  state: {
    // 大屏
    screenData: DEFAULT_SCREEN_DATA,
    guideLine: {
      show: true,
      value: [],
    },
    select: [],
    history: null,
    componentSelect: null,
    theme: ThemeMap.dark,
    clipboard: [],
    drag: {
      value: null,
    },
  },

  effects: {
    *setScreenName({ value }: { value: string }, { put }: any) {
      yield put({
        type: 'setData',
        payload: value,
      });
    },

    *setGuideLine({ value }: { value: string }, { put }: any) {
      yield put({
        type: 'setGuideLineData',
        payload: value,
      });
    },

    *setDragInfo({ value }: { value: DragData }, { put }: any) {
      yield put({
        type: 'setDragData',
        payload: value,
      });
    },
  },

  reducers: {
    setData(state: any, action: any) {
      set(state, 'screenData.name', action.payload);
      return state;
    },

    setGuideLineData(state: any, action: any) {
      set(state, 'guideLine', action.payload);
      return state;
    },

    setDragData(state: any, action: any) {
      set(state, 'drag', merge({}, get(state, 'drag'), action.payload));
      return state;
    },
  },
};
