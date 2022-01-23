import { MenuDataItem, Settings as ProSettings } from '@ant-design/pro-layout';
import UndoHistory from 'react-undo-component/lib/Component/history';
import { ThemeMap } from '@/utils/constants';

type DragData = {
  value: ComponentData.BaseComponentItem | null;
};
interface IGlobalModelState {
  screenData: Exclude<ComponentData.TScreenData, 'components'>;
  components: ComponentData.TScreenData['components'];
  guideLine: ComponentData.TGuideLineConfig;
  select: string[];
  componentSelect: ComponentData.TComponentData<any> | null;
  history: {
    value: UndoHistory;
    isUndoDisabled: boolean;
    isRedoDisabled: boolean;
  };
  theme: ThemeMap;
  clipboard: ComponentData.TComponentData<any>[];

  drag: DragData;
  scale: number;
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
}

export interface Route extends MenuDataItem {
  routes?: Route[];
}
