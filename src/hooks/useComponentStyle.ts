import { useHover } from 'ahooks';
import { merge } from 'lodash';
import { CSSProperties, useMemo } from 'react';
import { DEFAULT_THEME_COLOR } from '@/utils/Assist/Theme';

export const useComponentStyle: (
  value: ComponentData.TComponentData,
  options: {
    isSelect: boolean;
    style: CSSProperties;
    scale: number;
    query: string;
    screenType: ComponentData.ScreenType;
    flag: ComponentData.ScreenFlagType;
  },
) => CSSProperties = (value, options) => {
  const {
    config: {
      style: componentStyle,
      attr: { visible, lock },
    },
  } = value;
  const { isSelect, style, scale, query, screenType, flag } = options;

  const primaryColor = `${DEFAULT_THEME_COLOR}CC`;

  const isHover = useHover(() => document.querySelector(query));

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
      margin = { y: 0 },
      border,
      ...nextComponentStyle
    } = componentStyle;
    const borderWidth = screenType === 'edit' ? (1 / scale) * 100 : 0;
    const borderColor = isSelect || isHover ? primaryColor : 'transparent';
    return merge(
      {},
      nextComponentStyle,
      {
        border: `${borderWidth}px solid ${borderColor}`,
        zIndex: isSelect ? 4 : zIndex,
        pointerEvents: lock || !visible ? 'none' : 'unset',
        margin: `${margin.y}px 0px`,
      },
      flag === 'H5' && !visible
        ? {
            position: 'absolute',
          }
        : {},
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
    flag,
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
    const { left, top } = componentStyle;
    const position: any = {};
    if (!isOuter) {
      position.left = left;
      position.top = top;
    }
    return {
      width: '100%',
      height: '100%',
      ...position,
    };
  }, [componentStyle, scaleX, scaleY, isOuter]);

  return styles;
};
