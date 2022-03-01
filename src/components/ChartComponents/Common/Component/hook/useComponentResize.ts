import { useEffect } from 'react';

export function useComponentResize(
  value: ComponentData.TComponentData,
  callback?: () => void,
) {
  const {
    config: {
      style: { width, height },
    },
  } = value;

  useEffect(() => {
    callback?.();
  }, [width, height]);
}
