import React, { useMemo, forwardRef, CSSProperties, ReactNode } from 'react';
import classnames from 'classnames';
import { useAutoResize } from '../../InternalBorder/components/Border/hooks';
import styles from './index.less';

const defaultColor = ['#1a98fc', '#2cf7fe'];

export type IProps = {
  className?: string;
  style?: CSSProperties;
  color?: string[];
  children?: ReactNode;
};

const BorderBox = forwardRef((props: IProps, ref) => {
  const { width, height, domRef } = useAutoResize(ref);

  const { children, className, style, color = [] } = props;

  const mergedColor = useMemo(() => {
    return [color[0] || defaultColor[0], color[1] || defaultColor[1]];
  }, [color]);

  const classNames = useMemo(
    () => classnames(styles['component-decoration-11'], className),
    [className],
  );

  return (
    <div className={classNames} style={style} ref={domRef}>
      <svg width={width} height={height}>
        <polygon
          // fill={fade(mergedColor[1] || defaultColor[1], 10)}
          fill={mergedColor[1]}
          stroke={mergedColor[1]}
          points={`20 10, 25 4, 55 4 60 10`}
        />

        <polygon
          // fill={fade(mergedColor[1] || defaultColor[1], 10)}
          fill={mergedColor[1]}
          stroke={mergedColor[1]}
          points={`20 ${height - 10}, 25 ${height - 4}, 55 ${height - 4} 60 ${
            height - 10
          }`}
        />

        <polygon
          // fill={fade(mergedColor[1] || defaultColor[1], 10)}
          fill={mergedColor[1]}
          stroke={mergedColor[1]}
          points={`${width - 20} 10, ${width - 25} 4, ${width - 55} 4 ${
            width - 60
          } 10`}
        />

        <polygon
          // fill={fade(mergedColor[1] || defaultColor[1], 10)}
          fill={mergedColor[1]}
          stroke={mergedColor[1]}
          points={`${width - 20} ${height - 10}, ${width - 25} ${height - 4}, ${
            width - 55
          } ${height - 4} ${width - 60} ${height - 10}`}
        />

        <polygon
          // fill={fade(mergedColor[0] || defaultColor[0], 20)}
          fill={mergedColor[0]}
          stroke={mergedColor[0]}
          points={`
            20 10, 5 ${height / 2} 20 ${height - 10}
            ${width - 20} ${height - 10} ${width - 5} ${height / 2} ${
            width - 20
          } 10
          `}
        />

        <polyline
          fill="transparent"
          // stroke={fade(mergedColor[0] || defaultColor[0], 70)}
          stroke={mergedColor[0]}
          points={`25 18, 15 ${height / 2} 25 ${height - 18}`}
        />

        <polyline
          fill="transparent"
          // stroke={fade(mergedColor[0] || defaultColor[0], 70)}
          stroke={mergedColor[0]}
          points={`${width - 25} 18, ${width - 15} ${height / 2} ${
            width - 25
          } ${height - 18}`}
        />
      </svg>

      <div className={styles['component-decoration-11-content']}>
        {children}
      </div>
    </div>
  );
});

export default BorderBox;
