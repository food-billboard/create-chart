import { useMemo, useRef, useState } from 'react';
import { useScroll, useDebounceEffect } from 'ahooks';
import { Target, ScrollListenController } from 'ahooks/es/useScroll';

export function useIsScrolling(
  target: Target,
  shouldUpdate?: ScrollListenController,
) {
  const [isScroll, setIsScroll] = useState<boolean>(false);
  const { left, top } = useScroll(target, shouldUpdate) || { left: 0, top: 0 };
  const prevPosition = useRef<ReturnType<typeof useScroll>>({
    left,
    top,
  });
  const timer = useRef<any>();

  const compare = () => {
    clearTimeout(timer.current);
    const isScroll =
      left !== prevPosition.current?.left || top !== prevPosition.current?.top;

    prevPosition.current = {
      left,
      top,
    };

    if (isScroll) {
      timer.current = setTimeout(compare, 500);
    }

    setIsScroll(isScroll);

    return isScroll;
  };

  useDebounceEffect(
    () => {
      compare();
    },
    [left, top],
    {
      wait: 50,
    },
  );

  return isScroll;
}
