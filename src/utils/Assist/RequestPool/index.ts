import { toJS } from 'mobx';
import { IGlobalModelState } from '@/models/connect';
import GlobalConfig from '../GlobalConfig';
import {
  saveScreenDataAuto,
  saveScreenDataAllAuto,
  saveScreenDataAllAutoStatic,
} from '../DataChangePool';

class RequestPool {
  constructor(
    props: {
      onError?: (error: any) => void;
      stopOnError?: boolean;
    } = {},
  ) {
    const { onError, stopOnError } = props || {};

    this.errorMethod = onError;
    this.stopOnError = !!stopOnError;
  }

  #POOL: any[] = [];

  #REQUEST_LOADING = false;

  errorMethod: any;

  stopOnError: boolean = true;

  request = async (method?: any) => {
    if (typeof method !== 'function' && method !== undefined) return;

    method && this.#POOL.push(method);

    if (this.#REQUEST_LOADING || !this.#POOL.length) return;

    this.#REQUEST_LOADING = true;

    const targetMethod = this.#POOL[0];
    let errored = false;

    try {
      await targetMethod();
    } catch (err) {
      this.errorMethod?.(err);
      console.error(err);
      errored = true;
    } finally {
      if (errored && this.stopOnError) return;
      this.#POOL.shift();
      this.#REQUEST_LOADING = false;
      await this.request();
    }
  };
}

export const SCREEN_DATA_REQUEST_POOL = new RequestPool();

export const ScreenDataRequest = (state: IGlobalModelState, action: any) => {
  console.log(toJS(state), 222222);
  if (GlobalConfig.isAutoSaveType() && state.screenType === 'edit') {
    SCREEN_DATA_REQUEST_POOL.request(async () => {
      let method: any = saveScreenDataAuto;
      if (GlobalConfig.DEFAULT_SCREEN_SAVE_TYPE === 'auto-all-storage')
        method = saveScreenDataAllAutoStatic;
      if (GlobalConfig.DEFAULT_SCREEN_SAVE_TYPE === 'auto-all')
        method = saveScreenDataAllAuto;
      return method({
        state,
        action,
      });
    });
  }
};

export default RequestPool;
