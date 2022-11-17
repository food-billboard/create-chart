import React, { useMemo, forwardRef, CSSProperties } from 'react';
import classnames from 'classnames';
import { CommonBorderProps } from '../type';
import { useBorderWrapper, useAutoResize } from '../hooks';
import styles from './index.less';

const defaultColor = ['#6586ec', '#2cf7fe'];

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
  } = useBorderWrapper(props, 'internal-border-13-border', {
    colorType: 'list',
  });

  const mergedColor = useMemo(() => {
    return [color[0] || defaultColor[0], color[1] || defaultColor[1]];
  }, [color]);

  const classNames = useMemo(
    () => classnames(styles['internal-border-13-border'], className),
    [className],
  );

  return (
    <div className={classNames} ref={domRef}>
      <svg
        className={styles['internal-border-13-border-container']}
        width={width}
        height={height}
      >
        <path
          fill={backgroundColor}
          stroke={mergedColor[0]}
          d={`
            M 5 20 L 5 10 L 12 3  L 60 3 L 68 10
            L ${width - 20} 10 L ${width - 5} 25
            L ${width - 5} ${height - 5} L 20 ${height - 5}
            L 5 ${height - 20} L 5 20
          `}
        />

        <path
          fill="transparent"
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray="10, 5"
          stroke={mergedColor[0]}
          d="M 16 9 L 61 9"
        />

        <path
          fill="transparent"
          stroke={mergedColor[1]}
          d="M 5 20 L 5 10 L 12 3  L 60 3 L 68 10"
        />

        <path
          fill="transparent"
          stroke={mergedColor[1]}
          d={`M ${width - 5} ${height - 30} L ${width - 5} ${height - 5} L ${
            width - 30
          } ${height - 5}`}
        />
      </svg>
      <div
        {...nextProps}
        className={styles['internal-border-13-border-content']}
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
