import UndoHistory from 'react-undo-component/lib/Component/history';
import { DEFAULT_SCREEN_DATA, ThemeMap } from '@/utils/constants';
interface IGlobalModelState {
  screenData: ComponentData.TScreenData;
  guideLine: ComponentData.TGuideLineConfig[];
  select: string[];
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
    theme: ThemeMap.dark,
    clipboard: [],
  },

  effects: {},

  reducers: {},
};
