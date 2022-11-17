import React, { useMemo, forwardRef, CSSProperties } from 'react';
import classnames from 'classnames';
import { CommonBorderProps } from '../type';
import { useBorderWrapper, useAutoResize } from '../hooks';
import styles from './index.less';

const defaultColor = ['#2862b7', '#2862b7'];

export type IProps = CommonBorderProps & {
  color?: string[];
  backgroundColor?: string;
};

const BorderBox = forwardRef((props: IProps, ref) => {
  const { width, height, domRef } = useAutoResize(ref);

  const {
    origin: {
      props: { backgroundColor = 'transparent' },
      stringColor: color,
    },
    children,
    className,
    ...nextProps
  } = useBorderWrapper(props, 'internal-border-3-border', {
    colorType: 'list',
  });

  const mergedColor = useMemo(() => {
    return [color[0] || defaultColor[0], color[1] || defaultColor[1]];
  }, [color]);

  const classNames = useMemo(
    () => classnames(styles['internal-border-1-border'], className),
    [className],
  );

  return (
    <div className={classNames} ref={domRef}>
      <svg
        className={styles['internal-border-1-border-container']}
        width={width}
        height={height}
      >
        <polygon
          fill={backgroundColor}
          points={`
          23, 23 ${width - 24}, 23 ${width - 24}, ${height - 24} 23, ${
            height - 24
          }
        `}
        />
        <polyline
          className={styles['internal-border-1-border-line1']}
          stroke={mergedColor[0]}
          points={`4, 4 ${width - 22} ,4 ${width - 22}, ${height - 22} 4, ${
            height - 22
          } 4, 4`}
          fill={'none'}
        />
        <polyline
          className={styles['internal-border-1-border-line2']}
          stroke={mergedColor[1]}
          points={`10, 10 ${width - 16}, 10 ${width - 16}, ${height - 16} 10, ${
            height - 16
          } 10, 10`}
          fill={'none'}
        />
        <polyline
          className={styles['internal-border-1-border-line2']}
          stroke={mergedColor[1]}
          points={`16, 16 ${width - 10}, 16 ${width - 10}, ${height - 10} 16, ${
            height - 10
          } 16, 16`}
          fill={'none'}
        />
        <polyline
          className={styles['internal-border-1-border-line2']}
          stroke={mergedColor[1]}
          points={`22, 22 ${width - 4}, 22 ${width - 4}, ${height - 4} 22, ${
            height - 4
          } 22, 22`}
          fill={'none'}
        />
      </svg>

      <div
        {...nextProps}
        className={styles['internal-border-1-border-content']}
      >
        {children}
      </div>
    </div>
  );
});

const BorderBoxWrapper: typeof BorderBox & {
  getOuterStyle: (
    props: ComponentData.TScreenData['config']['attr']['componentBorder'],
  ) => CSSProperties;
  getOuterPadding: (
    props: ComponentData.TScreenData['config']['attr']['componentBorder'],
  ) => number[];
} = BorderBox as any;

BorderBoxWrapper.getOuterStyle = ({ width, padding }) => {
  return {
    padding: padding.map((item) => `${item + width * 0.4}px`).join(' '),
  };
};
BorderBoxWrapper.getOuterPadding = ({ width, padding }) => {
  return padding.map((item) => item + width * 0.4);
};

export default BorderBox;
