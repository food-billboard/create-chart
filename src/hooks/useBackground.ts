import { CSSProperties, useMemo } from 'react';
import ColorSelect from '@/components/ColorSelect';

export const useBackground: (
  value?: ComponentData.TBackgroundConfig,
) => CSSProperties = (value) => {
  if (!value) return {};

  const { type, background, color } = value;

  const style = useMemo(() => {
    let baseStyle: CSSProperties = {};
    if (type === 'color') {
      if (color) {
        const colorValue = ColorSelect.getRgbaString(color);
        baseStyle.backgroundColor = colorValue;
      }
    } else if (background) {
      baseStyle = {
        backgroundImage: background,
      };
    }
    return baseStyle;
  }, [type, background, color]);

  return style;
};
