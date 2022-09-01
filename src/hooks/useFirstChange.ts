import { useRef } from 'react';
import { useDeepCompareEffect } from 'ahooks';

export const useFirstChange = <T>(value: T, onChange?: (value: T) => void) => {
  const isChange = useRef<boolean>(false);
  const isFirst = useRef<boolean>(true);

  useDeepCompareEffect(() => {
    if (isChange.current) return;
    if (isFirst.current && value === undefined) return;
    isFirst.current = true;
    isChange.current = true;
    onChange?.(value);
  }, [value]);
};
