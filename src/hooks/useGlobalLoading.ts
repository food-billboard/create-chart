import { useCallback } from 'react';
import { useAnyDva } from './useAnyDva';

// 全局的设计loading状态控制

export type IsGlobalActionLoadingParams = {
  globalLoadingAction?: (callback: () => void) => any;
  needLoading?: boolean;
  force?: boolean;
};

export function useGlobalLoading() {
  const { dispatch, getState } = useAnyDva();

  const isGlobalActionLoading = useCallback(
    async (config: IsGlobalActionLoadingParams = {}) => {
      const { globalLoadingAction, needLoading = true, force = false } = config;
      const isLoading = getState().local.globalActionLoading;
      if (globalLoadingAction) {
        if (!isLoading || force) {
          needLoading && setGlobalActionLoading(true);
          return globalLoadingAction(setGlobalActionLoading.bind(null, false));
        }
      }
      return isLoading;
    },
    [],
  );

  const setGlobalActionLoading = useCallback((loading: boolean) => {
    dispatch({ type: 'local/setGlobalActionLoading', value: loading });
  }, []);

  return {
    isGlobalActionLoading,
    setGlobalActionLoading,
  };
}
