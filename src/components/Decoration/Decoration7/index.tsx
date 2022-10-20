import React, { useMemo, CSSProperties, ReactNode } from 'react';
import classnames from 'classnames';
import styles from './index.less';

const defaultColor = ['#1dc1f5', '#1dc1f5'];

export type IProps = {
  className?: string;
  style?: CSSProperties;
  color?: string[];
  children?: ReactNode;
};

const Decoration = (props: IProps) => {
  const { color = [], style, className, children } = props;

  const mergedColor = useMemo(() => {
    return [color[0] || defaultColor[0], color[1] || defaultColor[1]];
  }, [color]);

  const classNames = useMemo(
    () => classnames(styles['component-decoration-7'], className),
    [className],
  );

  return (
    <div className={classNames} style={style}>
      <svg width="21px" height="20px">
        <polyline
          strokeWidth="4"
          fill="transparent"
          stroke={mergedColor[0]}
          points="10, 0 19, 10 10, 20"
        />
        <polyline
          strokeWidth="2"
          fill="transparent"
          stroke={mergedColor[1]}
          points="2, 0 11, 10 2, 20"
        />
      </svg>
      {children}
      <svg width="21px" height="20px">
        <polyline
          strokeWidth="4"
          fill="transparent"
          stroke={mergedColor[0]}
          points="11, 0 2, 10 11, 20"
        />
        <polyline
          strokeWidth="2"
          fill="transparent"
          stroke={mergedColor[1]}
          points="19, 0 10, 10 19, 20"
        />
      </svg>
    </div>
  );
};

export default Decoration;
