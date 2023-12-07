import pMap from 'p-map';
import { IGlobalModelState } from '@/models/connect';
import {
  saveScreenDataAuto,
  saveScreenDataAllAuto,
  saveScreenDataAllAutoStatic,
} from '../DataChangePool';
import GlobalConfig from '../GlobalConfig';

class RequestPool {
  constructor(
    props: {
      onError?: (error: any) => void;
      stopOnError?: boolean;
      concurrency?: number;
    } = {},
  ) {
    const { onError, stopOnError, concurrency = 1 } = props || {};

    this.errorMethod = onError;
    this.stopOnError = !!stopOnError;
    this.concurrency = concurrency;
  }

  #POOL: any[] = [];

  #REQUEST_LOADING = false;

  errorMethod: any;

  stopOnError: boolean = true;

  concurrency: number = 1;

  request = async (method?: any) => {
    if (typeof method !== 'function' && method !== undefined) return;

    method && this.#POOL.push(method);

    if (this.#REQUEST_LOADING || !this.#POOL.length) return;

    this.#REQUEST_LOADING = true;

    const currentDealCount = this.#POOL.length;
    const targetMethods = this.#POOL.slice(0, currentDealCount);
    let errored = false;

    try {
      await pMap(targetMethods, (method) => method(), {
        concurrency: this.concurrency ?? 1,
        stopOnError: false,
      });
    } catch (err) {
      this.errorMethod?.(err);
      console.error(err);
      errored = true;
    } finally {
      if (errored && this.stopOnError) return;
      this.#POOL.splice(0, currentDealCount);
      this.#REQUEST_LOADING = false;
      await this.request();
    }
  };
}

export const SCREEN_DATA_REQUEST_POOL = new RequestPool();

export const ScreenDataRequest = (state: IGlobalModelState, action: any) => {
  if (GlobalConfig.isAutoSaveType() && state.screenType === 'edit') {
    SCREEN_DATA_REQUEST_POOL.request(async () => {
      let method: any = saveScreenDataAuto;
      switch (GlobalConfig.DEFAULT_SCREEN_SAVE_TYPE) {
        case 'auto-all-storage':
          method = saveScreenDataAllAutoStatic;
          break;
        case 'auto-all':
          method = saveScreenDataAllAuto;
      }
      return method({
        state,
        action,
      });
    });
  }
};

export default RequestPool;
