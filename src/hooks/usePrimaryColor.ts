import { useEffect, useState } from 'react';
import ColorSelect from '@/components/ColorSelect';
import ThemeUtil from '@/utils/Assist/Theme';
import {
  GLOBAL_EVENT_EMITTER,
  EVENT_NAME_MAP,
} from '@/utils/Assist/EventEmitter';

const { getRgbaString } = ColorSelect;

export const useColorList = () => {
  const [colorList, setColorList] = useState<string[]>([
    '#4ea397',
    '#22c3aa',
    '#7bd9a5',
    '#d0648a',
    '#f58db2',
    '#f2b3c9',
  ]);

  useEffect(() => {
    const onChange = () => {
      const color = ThemeUtil.getThemeColorList();
      setColorList(color);
    };
    GLOBAL_EVENT_EMITTER.addListener(EVENT_NAME_MAP.THEME_CHANGE, onChange);
    return () => {
      GLOBAL_EVENT_EMITTER.removeListener(
        EVENT_NAME_MAP.THEME_CHANGE,
        onChange,
      );
    };
  }, []);

  return colorList;
};

export const usePrimaryColor = () => {
  const [color, setColor] = useState<string>('#4ea397');

  useEffect(() => {
    const onChange = () => {
      const color = ThemeUtil.generateNextColor4CurrentTheme(0);
      setColor(getRgbaString(color));
    };
    GLOBAL_EVENT_EMITTER.addListener(EVENT_NAME_MAP.THEME_CHANGE, onChange);
    return () => {
      GLOBAL_EVENT_EMITTER.removeListener(
        EVENT_NAME_MAP.THEME_CHANGE,
        onChange,
      );
    };
  }, []);

  return color;
};
