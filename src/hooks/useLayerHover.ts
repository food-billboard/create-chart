import { useCallback } from 'react';
import {
  GLOBAL_EVENT_EMITTER,
  EVENT_NAME_MAP,
} from '@/utils/Assist/EventEmitter';

let HOVER_SELECT = '';
let CHANGE_DEALING = 0;

export const useLayerHover: () => [
  string,
  (value: string) => void,
  (
    callback: (
      select: string,
      prevSelect: string,
      progress: { getter: () => boolean; setter: () => void },
    ) => void,
  ) => void,
] = () => {
  const setHoverSelect = useCallback((value: string) => {
    if (HOVER_SELECT === value) return;
    CHANGE_DEALING++;
    const prevSelect = HOVER_SELECT;
    HOVER_SELECT = value;
    setTimeout(() => {
      if (CHANGE_DEALING > 1) {
        CHANGE_DEALING--;
      } else {
        let hovered = false;
        GLOBAL_EVENT_EMITTER.emit(
          EVENT_NAME_MAP.LAYER_HOVER_CHANGE,
          value,
          prevSelect,
          {
            getter: () => {
              // 此步骤为了优化频繁调用hover的情况
              // ? 应该还可以再优化，就先这样吧
              return CHANGE_DEALING > 1; // || hovered;
            },
            setter: () => {
              hovered = true;
            },
          },
        );
        CHANGE_DEALING = 0;
      }
    }, 100);
  }, []);

  const eventBinder = useCallback((callback) => {
    GLOBAL_EVENT_EMITTER.addListener(
      EVENT_NAME_MAP.LAYER_HOVER_CHANGE,
      callback,
    );
    return () => {
      GLOBAL_EVENT_EMITTER.removeListener(
        EVENT_NAME_MAP.LAYER_HOVER_CHANGE,
        callback,
      );
    };
  }, []);

  return [HOVER_SELECT, setHoverSelect, eventBinder];
};
