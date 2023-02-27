import UndoHistory from 'react-undo-component/lib/Component/history';
import { ThemeMap } from '@/utils/constants';
import { HistoryUtil } from '@/utils/Assist/History';

export type ILocalModelState = {
  componentCollapse: boolean;
  componentConfigCollapse: boolean;
};

export type DragData = {
  value: ComponentData.BaseComponentItem | null;
};
export type TUndoHistory = {
  value: HistoryUtil;
  isUndoDisabled: boolean;
  isRedoDisabled: boolean;
};
interface IGlobalModelState {
  screenType: ComponentData.ScreenType;
  screenData: Exclude<ComponentData.TScreenData, 'components'>;
  components: ComponentData.TScreenData['components'];
  guideLine: ComponentData.TGuideLineConfig;
  select: string[];
  componentSelect: ComponentData.TComponentData<any> | null;
  history: TUndoHistory;
  theme: ThemeMap;
  clipboard: ComponentClipboard.LocalClipboardType;

  drag: DragData;
  scale: number;
  version: string;
}

interface IDataModelState {
  mockValueKindMap: API_MOCK.TGetMockKindListData[];
}

interface IUserModelState {
  currentUser: any;
}
export interface Loading {
  global: boolean;
  effects: { [key: string]: boolean | undefined };
  models: {
    global?: boolean;
    settings?: boolean;
  };
}

export interface ConnectState {
  global: IGlobalModelState;
  loading: Loading;
  user: IUserModelState;
  data: IDataModelState;
  local: ILocalModelState;
}
