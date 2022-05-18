import { useEffect, useRef, useMemo } from 'react';
import { getUserInfo } from '../services';

export function useGetUserInfo(location: {
  pathname: string;
  [key: string]: any;
}) {
  const { pathname } = location;

  const timerRef = useRef<any>();

  const needRequest = useMemo(() => {
    return true;
  }, [pathname]);

  useEffect(() => {
    clearInterval(timerRef.current);

    if (!needRequest) return;

    timerRef.current = setInterval(() => {
      getUserInfo();
    }, 1000 * 60 * 5);

    return () => {
      clearInterval(timerRef.current);
    };
  }, [needRequest]);
}
