import { CSSProperties, useMemo } from 'react';
import { merge } from 'lodash';
import { useHover } from 'ahooks';
import ThemeUtil from '@/utils/Assist/Theme';
import ColorSelect from '@/components/ColorSelect';

const { getRgbaString } = ColorSelect;

export const useComponentStyle: (
  value: ComponentData.TComponentData,
  options: {
    isSelect: boolean;
    style: CSSProperties;
    scale: number;
    query: string;
  },
) => CSSProperties = (value, options) => {
  const {
    config: {
      style: componentStyle,
      attr: { visible, lock },
    },
  } = value;
  const { isSelect, style, scale, query } = options;

  const isHover = useHover(document.querySelector(query));

  const styles = useMemo(() => {
    const {
      rotate,
      width,
      height,
      left,
      top,
      zIndex,
      opacity,
      ...nextComponentStyle
    } = componentStyle;
    return merge(
      {},
      nextComponentStyle,
      {
        transform: `rotate(${rotate}deg)`,
        visibility: visible ? 'visible' : 'hidden',
        borderWidth: (1 / scale) * 100,
        zIndex: isSelect ? 4 : zIndex,
        pointerEvents: lock ? 'none' : 'unset',
        borderColor:
          isSelect || isHover
            ? getRgbaString(ThemeUtil.generateNextColor4CurrentTheme(0))
            : 'transparent',
      },
      style,
    );
  }, [componentStyle, style, visible, scale, isSelect, lock, isHover]);

  return styles;
};

export const useComponentChildrenStyle: (
  value: ComponentData.TComponentData,
  options: {
    isOuter: boolean;
  },
) => CSSProperties = (value, options) => {
  const {
    config: {
      style: componentStyle,
      attr: { scaleX = 1, scaleY = 1 },
    },
  } = value;
  const { isOuter } = options;

  const styles = useMemo(() => {
    const { opacity, rotate, left, top } = componentStyle;
    const position: any = {};
    if (!isOuter) {
      position.left = left;
      position.top = top;
    }
    return {
      width: '100%',
      height: '100%',
      transform: `rotate(${rotate}deg)`,
      opacity,
      ...position,
    };
  }, [componentStyle, scaleX, scaleY, isOuter]);

  return styles;
};
