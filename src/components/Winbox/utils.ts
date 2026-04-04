import { useGetState } from 'ahooks';
import { debounce } from 'lodash';
import { useEffect } from 'react';

export function useClientSize(
  callback?: (size: { width: number; height: number }) => void,
) {
  const stateInfo = useGetState({
    width: 0,
    height: 0,
  });

  const [, setSize] = stateInfo;

  useEffect(() => {
    const listener = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      setSize({
        width,
        height,
      });
      callback?.({
        width,
        height,
      });
    };
    const debounceListener = debounce(listener);
    listener();
    window.addEventListener('resize', debounceListener);
    return () => {
      window.removeEventListener('resize', debounceListener);
    };
  }, []);

  return stateInfo;
}
