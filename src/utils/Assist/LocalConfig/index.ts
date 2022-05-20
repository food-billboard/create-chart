import { EventEmitter } from 'eventemitter3';
import LocalForage from 'localforage';
import { throttle } from 'lodash';

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

  store;

  private _setItem = async (key: string, value: any) => {
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
    return response;
  };

  private _getItem = async (key: string) => {
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
    return response;
  };

  // setItem = throttle(this._setItem, 10)

  // getItem = throttle(this._getItem, 10)

  setItem = this._setItem;

  getItem = this._getItem;
}

export default new LocalConfig();
