import { useGetState } from 'ahooks';
import { useEffect, useState, useCallback } from 'react';
import LocalConfig from '@/utils/Assist/LocalConfig';

export const useLocalStorage: <T>(
  key: string,
  defaultValue?: T,
  needInitChange?: boolean,
) => [
  T | undefined,
  (value: T) => Promise<void>,
  () => T | undefined,
  boolean,
] = <T>(key: string, defaultValue?: T, needInitChange = true) => {
  const [value, setStateValue, getStateValue] = useGetState<T | undefined>(
    defaultValue,
  );
  const [initialDone, setInitialDone] = useState<boolean>(false);

  const onChange = async (init = false) => {
    const result = await LocalConfig.getItem(key);
    if (result && !result.errMsg) {
      setStateValue(result.value ?? defaultValue);
      init && setInitialDone(true);
    } else {
      init && setInitialDone(true);
    }
  };

  const setValue = useCallback(async (value: any) => {
    const result = await LocalConfig.setItem(key, value);
    if (result && !result.errMsg) {
      setStateValue(result.value);
      LocalConfig.emit('change');
    }
  }, []);

  useEffect(() => {
    needInitChange && onChange(true);
    LocalConfig.addListener('change', onChange);
    return () => {
      LocalConfig.removeListener('change', onChange);
    };
  }, []);

  return [value, setValue, getStateValue, initialDone];
};
