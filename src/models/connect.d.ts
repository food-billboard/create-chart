import { MenuDataItem, Settings as ProSettings } from '@ant-design/pro-layout';
import { IGlobalModelState } from './global';

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
