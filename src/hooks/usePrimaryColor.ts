import { useEffect, useState } from 'react';
import ColorSelect from '@/components/ColorSelect';
import {
  EVENT_NAME_MAP,
  GLOBAL_EVENT_EMITTER,
} from '@/utils/Assist/EventEmitter';
import ThemeUtil from '@/utils/Assist/Theme';

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

export const usePrimaryColorObject = () => {
  const [color, setColor] = useState<ComponentData.TColorConfig>({
    r: 78,
    g: 163,
    b: 151,
  });

  useEffect(() => {
    const onChange = () => {
      const color = ThemeUtil.generateNextColor4CurrentTheme(0);
      setColor(color);
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

export const usePrimaryColor = () => {
  const [color, setColor] = useState<string>(() =>
    getRgbaString(ThemeUtil.generateNextColor4CurrentTheme(0)),
  );

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
