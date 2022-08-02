import Eventemitter from 'eventemitter3';
import { useEffect, useState } from 'react';

const DATA_SOURCE: {
  select: string[];
} = {
  select: [],
};

const EVENT_EMITTER_INSTANCE = new Eventemitter();

export function getSelect() {
  return DATA_SOURCE.select;
}

export function setSelect(select: string[]) {
  EVENT_EMITTER_INSTANCE.emit('component-select', select);
  return select;
}

export function useSelect(onChange?: (value: string[]) => void) {
  const onInternalChange = (value: string[]) => {
    DATA_SOURCE.select = value;
    onChange?.(value);
  };

  useEffect(() => {
    EVENT_EMITTER_INSTANCE.addListener('component-select', onInternalChange);

    return () => {
      EVENT_EMITTER_INSTANCE.removeListener(
        'component-select',
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
    EVENT_EMITTER_INSTANCE.addListener('component-select', onInternalChange);

    return () => {
      EVENT_EMITTER_INSTANCE.removeListener(
        'component-select',
        onInternalChange,
      );
    };
  }, []);

  useEffect(() => {}, []);
}
