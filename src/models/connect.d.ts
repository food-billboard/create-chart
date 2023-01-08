import { MenuDataItem, Settings as ProSettings } from '@ant-design/pro-layout';
import UndoHistory from 'react-undo-component/lib/Component/history';
import { ThemeMap } from '@/utils/constants';

export type ILocalModelState = {
  componentCollapse: boolean;
  componentConfigCollapse: boolean;
};

export type DragData = {
  value: ComponentData.BaseComponentItem | null;
};
export type TUndoHistory = {
  value: UndoHistory;
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
  settings: ProSettings;
  user: IUserModelState;
  data: IDataModelState;
  local: ILocalModelState;
}

export interface Route extends MenuDataItem {
  routes?: Route[];
}
