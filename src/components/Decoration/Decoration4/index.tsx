import React, { useMemo, forwardRef, CSSProperties } from 'react';
import classnames from 'classnames';
import { useAutoResize } from '../../InternalBorder/components/Border/hooks';
import styles from './index.less';

const defaultColor = ['rgba(255, 255, 255, 0.3)', 'rgba(255, 255, 255, 0.3)'];

export type IProps = {
  className?: string;
  style?: CSSProperties;
  color?: string[];
  reverse?: boolean;
  dur?: number;
};

const Decoration = forwardRef((props: IProps, ref) => {
  const { width, height, domRef } = useAutoResize(ref);

  const { reverse = false, dur = 3, className, style, color = [] } = props;

  const mergedColor = useMemo(() => {
    return [color[0] || defaultColor[0], color[1] || defaultColor[1]];
  }, [color]);

  const classNames = useMemo(
    () => classnames(styles['component-decoration-4'], className),
    [className],
  );

  return (
    <div className={classNames} style={style} ref={domRef}>
      <div
        className={classnames(
          styles['component-decoration-4-container'],
          styles[`component-decoration-4-${!!reverse ? 'reverse' : 'normal'}`],
        )}
        style={
          reverse
            ? {
                width: `${width}px`,
                height: `5px`,
                animationDuration: `${dur}s`,
              }
            : {
                width: `5px`,
                height: `${height}px`,
                animationDuration: `${dur}s`,
              }
        }
      >
        <svg width={reverse ? width : 5} height={reverse ? 5 : height}>
          <polyline
            stroke={mergedColor[0]}
            points={reverse ? `0, 2.5 ${width}, 2.5` : `2.5, 0 2.5, ${height}`}
          />
          <polyline
            className={styles['component-decoration-4-bold-line']}
            stroke={mergedColor[1]}
            strokeWidth="3"
            strokeDasharray="20, 80"
            strokeDashoffset="-30"
            points={reverse ? `0, 2.5 ${width}, 2.5` : `2.5, 0 2.5, ${height}`}
          />
        </svg>
      </div>
    </div>
  );
});

export default Decoration;
