import { MenuDataItem, Settings as ProSettings } from '@ant-design/pro-layout';

export interface Loading {
  global: boolean;
  effects: { [key: string]: boolean | undefined };
  models: {
    global?: boolean;
    settings?: boolean;
  };
}

export interface ConnectState {
  global: any;
  loading: Loading
  settings: ProSettings
}

export interface Route extends MenuDataItem {
  routes?: Route[];
}
