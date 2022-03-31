import { useEffect, useState, useCallback } from 'react';
import LocalConfig from '@/utils/Assist/LocalConfig';

export const useLocalStorage: <T>(
  key: string,
  defaultValue?: T,
) => [T | undefined, (value: T) => Promise<void>] = <T>(
  key: string,
  defaultValue?: T,
) => {
  const [value, setStateValue] = useState<T | undefined>(defaultValue);

  const onChange = async () => {
    const result = await LocalConfig.getItem(key);
    if (result && !result.errMsg) {
      setStateValue(result.value ?? defaultValue);
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
    onChange();
    LocalConfig.addListener('change', onChange);
    return () => {
      LocalConfig.removeListener('change', onChange);
    };
  }, []);

  return [value, setValue];
};
