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
    screenType: ComponentData.ScreenType;
  },
) => CSSProperties = (value, options) => {
  const {
    config: {
      style: componentStyle,
      attr: { visible, lock },
    },
  } = value;
  const { isSelect, style, scale, query, screenType } = options;

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
      skew,
      ...nextComponentStyle
    } = componentStyle;
    const borderWidth = screenType === 'edit' ? (1 / scale) * 100 : 0;
    const borderColor =
      isSelect || isHover
        ? getRgbaString(ThemeUtil.generateNextColor4CurrentTheme(0))
        : 'transparent';
    return merge(
      {},
      nextComponentStyle,
      {
        transform: `rotate(${rotate}deg) skew(${skew?.x || 0}deg, ${
          skew?.y || 0
        }deg)`,
        visibility: visible ? 'visible' : 'hidden',
        border: `${borderWidth}px solid ${borderColor}`,
        zIndex: isSelect ? 4 : zIndex,
        pointerEvents: lock ? 'none' : 'unset',
      },
      style,
    );
  }, [
    componentStyle,
    style,
    visible,
    scale,
    isSelect,
    lock,
    isHover,
    screenType,
  ]);

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
