import { useEffect, useState } from 'react';
import { GLOBAL_EVENT_EMITTER, EVENT_NAME_MAP } from '../EventEmitter';

const DATA_SOURCE: {
  select: string[];
} = {
  select: [],
};

export function getSelect() {
  return DATA_SOURCE.select;
}

export function setSelect(select: string[]) {
  GLOBAL_EVENT_EMITTER.emit(EVENT_NAME_MAP.COMPONENT_SELECT, select);
  return select;
}

export function useSelect(onChange?: (value: string[]) => void) {
  const onInternalChange = (value: string[]) => {
    DATA_SOURCE.select = value;
    onChange?.(value);
  };

  useEffect(() => {
    GLOBAL_EVENT_EMITTER.addListener(
      EVENT_NAME_MAP.COMPONENT_SELECT,
      onInternalChange,
    );

    return () => {
      GLOBAL_EVENT_EMITTER.removeListener(
        EVENT_NAME_MAP.COMPONENT_SELECT,
        onInternalChange,
      );
    };
  }, []);

  return [DATA_SOURCE.select];
}

export function useObserverSelect(onChange?: (value: string[]) => void) {
  const [select, setSelect] = useState<string[]>(DATA_SOURCE.select);

  const onInternalChange = (value: string[]) => {
    DATA_SOURCE.select = value;
    onChange?.(value);
  };

  useEffect(() => {
    GLOBAL_EVENT_EMITTER.addListener(
      EVENT_NAME_MAP.COMPONENT_SELECT,
      onInternalChange,
    );

    return () => {
      GLOBAL_EVENT_EMITTER.removeListener(
        EVENT_NAME_MAP.COMPONENT_SELECT,
        onInternalChange,
      );
    };
  }, []);

  useEffect(() => {}, []);
}
