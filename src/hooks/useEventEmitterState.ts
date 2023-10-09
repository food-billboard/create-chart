import { uniqueId, debounce as debounceFunction } from 'lodash';
import { useEffect, useRef, useState } from 'react';
import {
  EVENT_NAME_MAP,
  GLOBAL_EVENT_EMITTER,
} from '@/utils/Assist/EventEmitter';

type Dispatch<T> = (value: T | ((prev: T) => T)) => void;

export function useEventEmitterState<T = any>(
  eventName: keyof typeof EVENT_NAME_MAP,
  options?: {
    initialValue?: T | (() => T);
    debounce?: {
      wait: number;
    };
  },
): [T | undefined, Dispatch<T>] {
  const {
    initialValue,
    debounce = {
      wait: 1000,
    },
  } = options || {};

  const [state, setState] = useState<T>(initialValue!);

  const stateKey = useRef(uniqueId('event-emitter-state-key'));

  const dispatch: Dispatch<T> = (value) => {
    if (typeof value === 'function') {
      setState((prev) => {
        // @ts-ignore
        const newValue = value(prev);
        GLOBAL_EVENT_EMITTER.emit(
          EVENT_NAME_MAP[eventName],
          stateKey.current,
          newValue,
        );
        return newValue;
      });
    } else {
      setState(value);
      GLOBAL_EVENT_EMITTER.emit(
        EVENT_NAME_MAP[eventName],
        stateKey.current,
        value,
      );
    }
  };

  useEffect(() => {
    const debounceSetState = debounceFunction(setState, debounce.wait);
    function listener(dispatchStateKey: string, newValue: T) {
      if (stateKey.current === dispatchStateKey) return;
      debounceSetState(newValue);
    }
    const event = EVENT_NAME_MAP[eventName];

    GLOBAL_EVENT_EMITTER.addListener(event, listener);

    return () => {
      GLOBAL_EVENT_EMITTER.removeListener(event, listener);
    };
  }, []);

  return [state, dispatch];
}
