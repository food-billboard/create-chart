import { useEffect, useState } from 'react';
import ColorSelect from '@/components/ColorSelect';
import ThemeUtil, {
  ThemeEventEmitter,
  THEM_EVENT_NAME,
} from '@/utils/Assist/Theme';

const { getRgbaString } = ColorSelect;

export const usePrimaryColor = () => {
  const [color, setColor] = useState<string>('#4ea397');

  const onChange = () => {
    const color = ThemeUtil.generateNextColor4CurrentTheme(0);
    setColor(getRgbaString(color));
  };

  useEffect(() => {
    ThemeEventEmitter.addListener(THEM_EVENT_NAME, onChange);
    return () => {
      ThemeEventEmitter.removeListener(THEM_EVENT_NAME, onChange);
    };
  }, []);

  return color;
};
