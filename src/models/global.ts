import UndoHistory from 'react-undo-component/lib/Component/history';
import { set } from 'lodash';
import { DEFAULT_SCREEN_DATA, ThemeMap } from '@/utils/constants';
interface IGlobalModelState {
  screenData: Exclude<ComponentData.TScreenData, 'components'>;
  components: ComponentData.TScreenData['components'];
  guideLine: {
    show: boolean;
    value: ComponentData.TGuideLineConfig[];
  };
  select: string[];
  componentSelect: ComponentData.TComponentData<any> | null;
  history: UndoHistory;
  theme: ThemeMap;
  clipboard: ComponentData.TComponentData<any>[];
}

export { IGlobalModelState };

export default {
  namespace: 'global',

  state: {
    // 大屏
    screenData: DEFAULT_SCREEN_DATA,
    guideLine: [],
    select: [],
    history: null,
    componentSelect: null,
    theme: ThemeMap.dark,
    clipboard: [],
  },

  effects: {
    *setScreenName({ value }: { value: string }, { put }: any) {
      yield put({
        type: 'setData',
        payload: value,
      });
    },
  },

  reducers: {
    setData(state: any, action: any) {
      set(state, 'screenData.name', action.payload);
      return state;
    },
  },
};
