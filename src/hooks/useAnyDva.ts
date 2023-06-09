import { getDvaApp } from 'umi';
import type { Dispatch } from 'dva';
import { ConnectState } from '@/models/connect';

let app: any;

export function useAnyDva(): {
  dispatch: Dispatch;
  getState: () => ConnectState;
} {
  if (!app) app = getDvaApp();

  return {
    dispatch: app._store.dispatch,
    getState: app._store.getState,
  };
}
