import { useRef } from 'react';
import { useDeepCompareEffect } from 'ahooks';

export const useDeepUpdateEffect: typeof useDeepCompareEffect = (
  effect,
  deps,
) => {
  const isFirst = useRef<boolean>(true);

  useDeepCompareEffect(() => {
    if (isFirst.current) {
      isFirst.current = false;
    } else {
      return effect();
    }
  }, deps);
};
