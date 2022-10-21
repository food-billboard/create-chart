import React, { useMemo, forwardRef, CSSProperties } from 'react';
import classnames from 'classnames';
import { CommonBorderProps } from '../type';
import { useBorderWrapper, useAutoResize } from '../hooks';
import styles from './index.less';

const defaultColor = ['rgba(255, 255, 255, 0.35)', 'rgba(255, 255, 255, 0.20)'];

export type IProps = CommonBorderProps & {
  color?: string[];
  backgroundColor?: string;
  reverse?: boolean;
};

const BorderBox = forwardRef((props: IProps, ref) => {
  const { width, height, domRef } = useAutoResize(ref);

  const {
    origin: {
      props: { backgroundColor = 'transparent', reverse = false },
      stringColor: color,
    },
    children,
    className,
    ...nextProps
  } = useBorderWrapper(props, 'internal-border-5-border', {
    colorType: 'list',
  });

  const mergedColor = useMemo(() => {
    return [color[0] || defaultColor[0], color[1] || defaultColor[1]];
  }, [color]);
  const classNames = useMemo(
    () => classnames(styles['internal-border-5-border'], className),
    [className],
  );

  return (
    <div className={classNames} ref={domRef}>
      <svg
        className={classnames(styles['internal-border-5-border'], {
          [styles['internal-border-5-border-reverse']]: !!reverse,
        })}
        width={width}
        height={height}
      >
        <polygon
          fill={backgroundColor}
          points={`
          10, 22 ${width - 22}, 22 ${width - 22}, ${height - 86} ${
            width - 84
          }, ${height - 24} 10, ${height - 24}
        `}
        />
        <polyline
          className={styles['internal-border-5-border-line-1']}
          stroke={mergedColor[0]}
          points={`8, 5 ${width - 5}, 5 ${width - 5}, ${height - 100}
          ${width - 100}, ${height - 5} 8, ${height - 5} 8, 5`}
          fill="none"
        />
        <polyline
          className={styles['internal-border-5-border-line-2']}
          stroke={mergedColor[1]}
          points={`3, 5 ${width - 20}, 5 ${width - 20}, ${height - 60}
          ${width - 74}, ${height - 5} 3, ${height - 5} 3, 5`}
          fill="none"
        />
        <polyline
          className={styles['internal-border-5-border-line-3']}
          stroke={mergedColor[1]}
          points={`50, 13 ${width - 35}, 13`}
          fill="none"
        />
        <polyline
          className={styles['internal-border-5-border-line-4']}
          stroke={mergedColor[1]}
          points={`15, 20 ${width - 35}, 20`}
          fill="none"
        />
        <polyline
          className={styles['internal-border-5-border-line-5']}
          stroke={mergedColor[1]}
          points={`15, ${height - 20} ${width - 110}, ${height - 20}`}
          fill="none"
        />
        <polyline
          className={styles['internal-border-5-border-line-6']}
          stroke={mergedColor[1]}
          points={`15, ${height - 13} ${width - 110}, ${height - 13}`}
          fill="none"
        />
      </svg>

      <div
        {...nextProps}
        className={styles['internal-border-5-border-content']}
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
