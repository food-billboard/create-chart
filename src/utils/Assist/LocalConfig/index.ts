import LocalForage from 'localforage';
import { debounce } from 'lodash';
import { GLOBAL_EVENT_EMITTER_FACTORY, EVENT_NAME_MAP } from '../EventEmitter';

export class LocalConfig extends GLOBAL_EVENT_EMITTER_FACTORY {
  constructor() {
    super();
    this.store = LocalForage.createInstance({
      name: 'LOCAL_CONFIG',
    });
  }

  // * 记得这里的key其实是从总的事件那边复制来的(/src/utils/Assist/EventEmitter/ComponentAbout.event.ts)
  // * 所以需要那边存一份，这样方便统一管理
  static CONFIG_KEY_BACKGROUND = EVENT_NAME_MAP.CONFIG_KEY_BACKGROUND;
  static CONFIG_KEY_LAYER_WIDTH = EVENT_NAME_MAP.CONFIG_KEY_LAYER_WIDTH;
  static CONFIG_KEY_COMPONENT_CONFIG_WIDTH =
    EVENT_NAME_MAP.CONFIG_KEY_COMPONENT_CONFIG_WIDTH;
  static CONFIG_KEY_SHEPHERD_INFO = EVENT_NAME_MAP.CONFIG_KEY_SHEPHERD_INFO;
  static CONFIG_KEY_SHEPHERD_THEME_CONFIG_INFO =
    EVENT_NAME_MAP.CONFIG_KEY_SHEPHERD_THEME_CONFIG_INFO;
  static CONFIG_KEY_CROSS_CLIPBOARD = EVENT_NAME_MAP.CONFIG_KEY_CROSS_CLIPBOARD;
  static CONFIG_KEY_CHROME_PROMPT = EVENT_NAME_MAP.CONFIG_KEY_CHROME_PROMPT;
  static STATIC_COMPONENT_DATA_SAVE_KEY =
    EVENT_NAME_MAP.STATIC_COMPONENT_DATA_SAVE_KEY;
  static STATIC_COMPONENT_DATA_SAVE_TIMESTAMPS =
    EVENT_NAME_MAP.STATIC_COMPONENT_DATA_SAVE_TIMESTAMPS;
  static STATIC_GUIDE_LINE_DRAG_INTEGER_STICKY =
    EVENT_NAME_MAP.STATIC_GUIDE_LINE_DRAG_INTEGER_STICKY;
  static IMPROVE_BACKEND_STATIC_COMPONENT_DATA_SAVE_PREFIX =
    EVENT_NAME_MAP.IMPROVE_BACKEND_STATIC_COMPONENT_DATA_SAVE_PREFIX;
  static STATIC_SCREEN_SHOT_SAVE_KEY =
    EVENT_NAME_MAP.STATIC_SCREEN_SHOT_SAVE_KEY;

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

  private _removeItem: <T = any>(
    key: string,
  ) => Promise<{
    value?: T;
    errMsg: null | unknown;
  }> = async (key) => {
    let response: any;
    try {
      await this.store.removeItem(key);
      response = {
        errMsg: null,
        value: true,
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

  removeItem = this._removeItem;
}

export default new LocalConfig();
