import {
  useState,
  useCallback,
  useEffect,
  useRef,
  useImperativeHandle,
} from 'react';

export function debounce(fn, delay = 600, runFirstFn = true) {
  let timer = null;

  return function (...rest) {
    // 清除定时器
    clearTimeout(timer);
    if (runFirstFn) {
      fn.apply(this, rest);
      runFirstFn = false;
      return;
    }

    // 设置定时器
    timer = setTimeout(fn.bind(this, ...rest), delay);
  };
}

export function observerDomResize(dom, callback) {
  const MutationObserver =
    window.MutationObserver ||
    window.WebKitMutationObserver ||
    window.MozMutationObserver;

  const observer = new MutationObserver(callback);

  observer.observe(dom, {
    attributes: true,
    attributeFilter: ['style'],
    attributeOldValue: true,
  });

  return observer;
}

export default function useAutoResize(ref) {
  const [state, setState] = useState({ width: 0, height: 0 });

  const domRef = useRef(null);

  const setWH = useCallback(() => {
    const { clientWidth, clientHeight } = domRef.current || {
      clientWidth: 0,
      clientHeight: 0,
    };

    setState({ width: clientWidth, height: clientHeight });

    if (!domRef.current) {
      console.warn(
        'DataV: Failed to get dom node, component rendering may be abnormal!',
      );
    } else if (!clientWidth || !clientHeight) {
      console.warn(
        'DataV: Component width or height is 0px, rendering abnormality may occur!',
      );
    }
  }, []);

  useImperativeHandle(ref, () => ({ setWH }), []);

  useEffect(() => {
    const debounceSetWHFun = debounce(setWH, 100);

    debounceSetWHFun();

    const domObserver = observerDomResize(domRef.current, debounceSetWHFun);

    window.addEventListener('resize', debounceSetWHFun);

    return () => {
      window.removeEventListener('resize', debounceSetWHFun);

      if (!domObserver) {
        return;
      }

      domObserver.disconnect();
      domObserver.takeRecords();
    };
  }, []);

  return { ...state, domRef, setWH };
}
