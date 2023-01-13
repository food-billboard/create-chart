import { EventEmitter } from 'eventemitter3';
import LocalForage from 'localforage';
import { throttle, debounce } from 'lodash';

export class LocalConfig extends EventEmitter {
  constructor() {
    super();
    this.store = LocalForage.createInstance({
      name: 'LOCAL_CONFIG',
    });
  }

  static CONFIG_KEY_BACKGROUND = 'CONFIG_KEY_BACKGROUND';
  static CONFIG_KEY_LAYER_WIDTH = 'CONFIG_KEY_LAYER_WIDTH';
  static CONFIG_KEY_SHEPHERD_INFO = 'CONFIG_KEY_SHEPHERD_INFO';
  static CONFIG_KEY_CROSS_CLIPBOARD = 'CONFIG_KEY_CROSS_CLIPBOARD';
  static CONFIG_KEY_CHROME_PROMPT = 'CONFIG_KEY_CHROME_PROMPT';
  static STATIC_COMPONENT_DATA_SAVE_KEY_KEY =
    'STATIC_COMPONENT_DATA_SAVE_KEY_KEY';

  store;

  private _setItem: <T = any>(
    key: string,
    value: T,
  ) => Promise<{
    value?: T;
    errMsg: unknown | null;
  }> = async (key, value) => {
    let response: any;
    try {
      await this.store.setItem(key, value);
      response = {
        errMsg: null,
        value,
      };
    } catch (err) {
      console.error(err);
      response = {
        errMsg: err,
      };
    }
    return response;
  };

  private _getItem: <T = any>(
    key: string,
  ) => Promise<{
    value?: T;
    errMsg: null | unknown;
  }> = async (key) => {
    let response: any;
    try {
      const value = await this.store.getItem(key);
      response = {
        errMsg: null,
        value,
      };
    } catch (err) {
      console.error(err);
      response = {
        errMsg: err,
      };
    }
    return response;
  };

  debounceSetItem = debounce(this._setItem, 10);

  debounceGetItem = debounce(this._getItem, 10);

  setItem = this._setItem;

  getItem = this._getItem;
}

export default new LocalConfig();
