import React, { useMemo, forwardRef, CSSProperties } from 'react';
import classnames from 'classnames';
import { CommonBorderProps } from '../type';
import { useBorderWrapper, useAutoResize } from '../hooks';
import styles from './index.less';

export type IProps = CommonBorderProps & {
  color?: string[];
  backgroundColor?: string;
};

const defaultColor = ['#fff', 'rgba(255, 255, 255, 0.6)'];

const BorderBox = forwardRef((props: IProps, ref) => {
  const { width, height, domRef } = useAutoResize(ref);

  const {
    origin: {
      props: { color = [], backgroundColor = 'transparent' },
    },
    children,
    className,
    ...nextProps
  } = useBorderWrapper(props, 'internal-border-2-border', {
    colorType: 'list',
  });

  const mergedColor = useMemo(() => {
    return [color[0] || defaultColor[0], color[1] || defaultColor[1]];
  }, [color]);
  const classNames = useMemo(
    () => classnames(styles['internal-border-2-border'], className),
    [className],
  );

  return (
    <div className={classNames} ref={domRef}>
      <svg
        className={styles['internal-border-2-border-container']}
        width={width}
        height={height}
      >
        <polygon
          fill={backgroundColor}
          points={`
          7, 7 ${width - 7}, 7 ${width - 7}, ${height - 7} 7, ${height - 7}
        `}
        />
        <polyline
          stroke={mergedColor[0]}
          points={`2, 2 ${width - 2} ,2 ${width - 2}, ${height - 2} 2, ${
            height - 2
          } 2, 2`}
        />
        <polyline
          stroke={mergedColor[1]}
          points={`6, 6 ${width - 6}, 6 ${width - 6}, ${height - 6} 6, ${
            height - 6
          } 6, 6`}
        />
        <circle fill={mergedColor[0]} cx="11" cy="11" r="1" />
        <circle fill={mergedColor[0]} cx={width - 11} cy="11" r="1" />
        <circle fill={mergedColor[0]} cx={width - 11} cy={height - 11} r="1" />
        <circle fill={mergedColor[0]} cx="11" cy={height - 11} r="1" />
      </svg>
      <div
        className={styles['internal-border-2-border-content']}
        {...nextProps}
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
} = BorderBox as any;

BorderBoxWrapper.getOuterStyle = ({ width, padding }) => {
  return {
    padding: padding.map((item) => `${item + width * 0.4}px`).join(' '),
  };
};

export default BorderBox;
