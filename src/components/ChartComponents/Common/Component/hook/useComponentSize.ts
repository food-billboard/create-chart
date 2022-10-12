import { useState } from 'react';
import { useDebounceEffect } from 'ahooks';

export function useComponentSize(
  query: string,
  defaultValue: { width: number; height: number },
  deps: any[],
) {
  const [componentSize, setComponentSize] = useState<{
    width: number;
    height: number;
  }>(defaultValue);

  useDebounceEffect(() => {
    const dom = document.querySelector(query);
    if (dom) {
      const width = dom.clientWidth;
      const height = dom.clientHeight;
      setComponentSize({
        width,
        height,
      });
    }
  }, deps);

  return componentSize;
}
