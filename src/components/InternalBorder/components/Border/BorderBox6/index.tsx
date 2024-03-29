import React, { useMemo, forwardRef, CSSProperties } from 'react';
import classnames from 'classnames';
import { CommonBorderProps } from '../type';
import { useBorderWrapper, useAutoResize } from '../hooks';
import styles from './index.less';

const defaultColor = ['rgba(255, 255, 255, 0.35)', 'gray'];

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
  } = useBorderWrapper(props, 'internal-border-6-border', {
    colorType: 'list',
  });

  const mergedColor = useMemo(() => {
    return [color[0] || defaultColor[0], color[1] || defaultColor[1]];
  }, [color]);

  const classNames = useMemo(
    () => classnames(styles['internal-border-6-border'], className),
    [className],
  );

  return (
    <div className={classNames} ref={domRef}>
      <svg
        className={styles['internal-border-6-border-container']}
        width={width}
        height={height}
      >
        <polygon
          fill={backgroundColor}
          points={`
          9, 7 ${width - 9}, 7 ${width - 9}, ${height - 7} 9, ${height - 7}
        `}
        />
        <circle fill={mergedColor[1]} cx="5" cy="5" r="2" />
        <circle fill={mergedColor[1]} cx={width - 5} cy="5" r="2" />
        <circle fill={mergedColor[1]} cx={width - 5} cy={height - 5} r="2" />
        <circle fill={mergedColor[1]} cx="5" cy={height - 5} r="2" />
        <polyline stroke={mergedColor[0]} points={`10, 4 ${width - 10}, 4`} />
        <polyline
          stroke={mergedColor[0]}
          points={`10, ${height - 4} ${width - 10}, ${height - 4}`}
        />
        <polyline stroke={mergedColor[0]} points={`5, 70 5, ${height - 70}`} />
        <polyline
          stroke={mergedColor[0]}
          points={`${width - 5}, 70 ${width - 5}, ${height - 70}`}
        />
        <polyline stroke={mergedColor[0]} points={`3, 10, 3, 50`} />
        <polyline stroke={mergedColor[0]} points={`7, 30 7, 80`} />
        <polyline
          stroke={mergedColor[0]}
          points={`${width - 3}, 10 ${width - 3}, 50`}
        />
        <polyline
          stroke={mergedColor[0]}
          points={`${width - 7}, 30 ${width - 7}, 80`}
        />
        <polyline
          stroke={mergedColor[0]}
          points={`3, ${height - 10} 3, ${height - 50}`}
        />
        <polyline
          stroke={mergedColor[0]}
          points={`7, ${height - 30} 7, ${height - 80}`}
        />
        <polyline
          stroke={mergedColor[0]}
          points={`${width - 3}, ${height - 10} ${width - 3}, ${height - 50}`}
        />
        <polyline
          stroke={mergedColor[0]}
          points={`${width - 7}, ${height - 30} ${width - 7}, ${height - 80}`}
        />
      </svg>

      <div
        {...nextProps}
        className={styles['internal-border-6-border-content']}
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
