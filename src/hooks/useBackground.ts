import { CSSProperties, useMemo, ReactNode } from 'react';
import ColorSelect from '@/components/ColorSelect';

export const useBackground: (
  value?: ComponentData.TBackgroundConfig,
) => CSSProperties = (value) => {
  if (!value) return {};

  const { type, background, color, internal_background } = value;

  const style = useMemo(() => {
    let baseStyle: CSSProperties = {};
    if (type === 'color') {
      if (color) {
        const colorValue = ColorSelect.getRgbaString(color);
        baseStyle.backgroundColor = colorValue;
      }
    } else if (type === 'image' && background) {
      baseStyle = {
        backgroundImage: background,
      };
    } else if (type === 'internal_background' && internal_background) {
      baseStyle = {
        backgroundImage: `internal_background-${internal_background}`,
      };
    }
    return baseStyle;
  }, [type, background, color, internal_background]);

  return style;
};
