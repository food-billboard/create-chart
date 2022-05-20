import { useEffect, useState, useCallback } from 'react';
import LocalConfig from '@/utils/Assist/LocalConfig';

export const useLocalStorage: <T>(
  key: string,
  defaultValue?: T,
) => [T | undefined, (value: T) => Promise<void>, boolean] = <T>(
  key: string,
  defaultValue?: T,
) => {
  const [value, setStateValue] = useState<T | undefined>(defaultValue);
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
    onChange(true);
    LocalConfig.addListener('change', onChange);
    return () => {
      LocalConfig.removeListener('change', onChange);
    };
  }, []);

  return [value, setValue, initialDone];
};
