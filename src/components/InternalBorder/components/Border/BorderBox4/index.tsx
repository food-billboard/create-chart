import React, { useMemo, forwardRef } from 'react';
import classnames from 'classnames';
import { CommonBorderProps } from '../type';
import { useBorderWrapper, useAutoResize } from '../hooks';
import styles from './index.less';

const defaultColor = ['red', 'rgba(0,0,255,0.8)'];

export type IProps = CommonBorderProps & {
  color?: string[];
  backgroundColor?: string;
  reverse?: boolean;
};

const BorderBox = forwardRef((props: IProps, ref) => {
  const { width, height, domRef } = useAutoResize(ref);

  const {
    origin: {
      props: { color = [], backgroundColor = 'transparent', reverse = false },
    },
    children,
    className,
    ...nextProps
  } = useBorderWrapper(props, 'internal-border-4-border', {
    colorType: 'list',
  });

  const mergedColor = useMemo(() => {
    return [color[0] || defaultColor[0], color[1] || defaultColor[1]];
  }, [color]);

  const classNames = useMemo(
    () => classnames(styles['internal-border-4-border'], className),
    [className],
  );

  return (
    <div {...nextProps} className={classNames} ref={domRef}>
      <svg
        className={classnames(styles['internal-border-4-border-container'], {
          [styles['internal-border-4-border-reverse']]: !!reverse,
        })}
        width={width}
        height={height}
      >
        <polygon
          fill={backgroundColor}
          points={`
          ${width - 15}, 22 170, 22 150, 7 40, 7 28, 21 32, 24
          16, 42 16, ${height - 32} 41, ${height - 7} ${width - 15}, ${
            height - 7
          }
        `}
        />
        <polyline
          className={styles['internal-border-4-border-line-1']}
          stroke={mergedColor[0]}
          points={`145, ${height - 5} 40, ${height - 5} 10, ${height - 35}
          10, 40 40, 5 150, 5 170, 20 ${width - 15}, 20`}
        />
        <polyline
          className={styles['internal-border-4-border-line-2']}
          stroke={mergedColor[1]}
          points={`245, ${height - 1} 36, ${height - 1} 14, ${height - 23}
          14, ${height - 100}`}
        />
        <polyline
          className={styles['internal-border-4-border-line-3']}
          stroke={mergedColor[0]}
          points={`7, ${height - 40} 7, ${height - 75}`}
        />
        <polyline
          className={styles['internal-border-4-border-line-4']}
          stroke={mergedColor[0]}
          points={`28, 24 13, 41 13, 64`}
        />
        <polyline
          className={styles['internal-border-4-border-line-5']}
          stroke={mergedColor[0]}
          points={`5, 45 5, 140`}
        />
        <polyline
          className={styles['internal-border-4-border-line-6']}
          stroke={mergedColor[1]}
          points={`14, 75 14, 180`}
        />
        <polyline
          className={styles['internal-border-4-border-line-7']}
          stroke={mergedColor[1]}
          points={`55, 11 147, 11 167, 26 250, 26`}
        />
        <polyline
          className={styles['internal-border-4-border-line-8']}
          stroke={mergedColor[1]}
          points={`158, 5 173, 16`}
        />
        <polyline
          className={styles['internal-border-4-border-line-9']}
          stroke={mergedColor[0]}
          points={`200, 17 ${width - 10}, 17`}
        />
        <polyline
          className={styles['internal-border-4-border-line-10']}
          stroke={mergedColor[1]}
          points={`385, 17 ${width - 10}, 17`}
        />
      </svg>

      <div className={styles['internal-border-4-border-content']}>
        {children}
      </div>
    </div>
  );
});

export default BorderBox;
