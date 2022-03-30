import { MenuDataItem, Settings as ProSettings } from '@ant-design/pro-layout';
import UndoHistory from 'react-undo-component/lib/Component/history';
import { ThemeMap } from '@/utils/constants';

export type DragData = {
  value: ComponentData.BaseComponentItem | null;
};
export type TUndoHistory = {
  value: UndoHistory;
  isUndoDisabled: boolean;
  isRedoDisabled: boolean;
};
interface IGlobalModelState {
  screenTheme: string;
  screenType: ComponentData.ScreenType;
  screenData: Exclude<ComponentData.TScreenData, 'components'>;
  components: ComponentData.TScreenData['components'];
  guideLine: ComponentData.TGuideLineConfig;
  select: string[];
  hoverSelect: string;
  componentSelect: ComponentData.TComponentData<any> | null;
  history: TUndoHistory;
  theme: ThemeMap;
  clipboard: string[];

  drag: DragData;
  scale: number;
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
}

export interface Route extends MenuDataItem {
  routes?: Route[];
}
