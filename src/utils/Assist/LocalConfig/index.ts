import { EventEmitter } from 'eventemitter3';
import LocalForage from 'localforage';

export class LocalConfig extends EventEmitter {
  constructor() {
    super();
    this.store = LocalForage.createInstance({
      name: 'LOCAL_CONFIG',
    });
  }

  static CONFIG_KEY_BACKGROUND = 'CONFIG_KEY_BACKGROUND';
  static CONFIG_KEY_LAYER_WIDTH = 'CONFIG_KEY_LAYER_WIDTH';

  loading = false;
  store;

  setItem = async (key: string, value: any) => {
    if (this.loading) return;
    this.loading = true;
    let response: any;
    try {
      await this.store.setItem(key, value);
      response = {
        errMsg: null,
        value,
      };
    } catch (err) {
      response = {
        errMsg: err,
      };
    }
    this.loading = false;
    return response;
  };

  getItem = async (key: string) => {
    if (this.loading) return;
    this.loading = true;
    let response: any;
    try {
      const value = await this.store.getItem(key);
      response = {
        errMsg: null,
        value,
      };
    } catch (err) {
      response = {
        errMsg: err,
      };
    }
    this.loading = false;
    return response;
  };
}

export default new LocalConfig();
