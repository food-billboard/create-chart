import React, { useMemo, forwardRef, CSSProperties } from 'react';
import classnames from 'classnames';
import { CommonBorderProps } from '../type';
import { useBorderWrapper, useAutoResize } from '../hooks';
import styles from './index.less';

const defaultColor = ['rgba(128,128,128,0.3)', 'rgba(128,128,128,0.5)'];

export type IProps = CommonBorderProps & {
  color?: string[];
  backgroundColor?: string;
};

const BorderBox = forwardRef((props: IProps, ref) => {
  const { width, height, domRef } = useAutoResize(ref);

  const {
    origin: {
      props: { color = [], backgroundColor = 'transparent' },
    },
    children,
    className,
    ...nextProps
  } = useBorderWrapper(props, 'internal-border-7-border', {
    colorType: 'list',
  });

  const mergedColor = useMemo(() => {
    return [color[0] || defaultColor[0], color[1] || defaultColor[1]];
  }, [color]);

  const classNames = useMemo(
    () => classnames(styles['internal-border-7-border'], className),
    [className],
  );

  const newStyle = useMemo(
    () => ({
      boxShadow: `inset 0 0 40px ${mergedColor[0]}`,
      border: `1px solid ${mergedColor[0]}`,
      backgroundColor,
    }),
    [mergedColor, backgroundColor],
  );

  return (
    <div className={classNames} style={newStyle} ref={domRef}>
      <svg
        className={styles['internal-border-7-border-container']}
        width={width}
        height={height}
      >
        <polyline
          className={styles['internal-border-7-border-line-width-2']}
          stroke={mergedColor[0]}
          points={`0, 25 0, 0 25, 0`}
        />
        <polyline
          className={styles['internal-border-7-border-line-width-2']}
          stroke={mergedColor[0]}
          points={`${width - 25}, 0 ${width}, 0 ${width}, 25`}
        />
        <polyline
          className={styles['internal-border-7-border-line-width-2']}
          stroke={mergedColor[0]}
          points={`${width - 25}, ${height} ${width}, ${height} ${width}, ${
            height - 25
          }`}
        />
        <polyline
          className={styles['internal-border-7-border-line-width-2']}
          stroke={mergedColor[0]}
          points={`0, ${height - 25} 0, ${height} 25, ${height}`}
        />
        <polyline
          className={styles['internal-border-7-border-line-width-5']}
          stroke={mergedColor[1]}
          points={`0, 10 0, 0 10, 0`}
        />
        <polyline
          className={styles['internal-border-7-border-line-width-5']}
          stroke={mergedColor[1]}
          points={`${width - 10}, 0 ${width}, 0 ${width}, 10`}
        />
        <polyline
          className={styles['internal-border-7-border-line-width-5']}
          stroke={mergedColor[1]}
          points={`${width - 10}, ${height} ${width}, ${height} ${width}, ${
            height - 10
          }`}
        />
        <polyline
          className={styles['internal-border-7-border-line-width-5']}
          stroke={mergedColor[1]}
          points={`0, ${height - 10} 0, ${height} 10, ${height}`}
        />
      </svg>

      <div
        {...nextProps}
        className={styles['internal-border-7-border-content']}
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
