import React, { useMemo, forwardRef, CSSProperties } from 'react';
import classnames from 'classnames';
import { useAutoResize } from '../../InternalBorder/components/Border/hooks';
import styles from './index.less';

const defaultColor = ['#3faacb', '#fff'];

export type IProps = {
  className?: string;
  style?: CSSProperties;
  color?: string[];
  reverse?: boolean;
  dur?: number;
};

const Decoration = forwardRef((props: IProps, ref) => {
  const { width, height, domRef } = useAutoResize(ref);

  const { reverse = false, dur = 6, className, style, color = [] } = props;

  function calcSVGData() {
    return reverse
      ? { w: 1, h: height, x: width / 2, y: 0 }
      : { w: width, h: 1, x: 0, y: height / 2 };
  }

  const mergedColor = useMemo(() => {
    return [color[0] || defaultColor[0], color[1] || defaultColor[1]];
  }, [color]);

  const { x, y, w, h } = useMemo(calcSVGData, [reverse, width, height]);

  const classNames = useMemo(
    () => classnames(styles['component-decoration-2'], className),
    [className],
  );

  return (
    <div className={classNames} style={style} ref={domRef}>
      <svg width={`${width}px`} height={`${height}px`}>
        <rect x={x} y={y} width={w} height={h} fill={mergedColor[0]}>
          <animate
            attributeName={reverse ? 'height' : 'width'}
            from="0"
            to={reverse ? height : width}
            dur={`${dur}s`}
            calcMode="spline"
            keyTimes="0;1"
            keySplines=".42,0,.58,1"
            repeatCount="indefinite"
          />
        </rect>

        <rect x={x} y={y} width="1" height="1" fill={mergedColor[1]}>
          <animate
            attributeName={reverse ? 'y' : 'x'}
            from="0"
            to={reverse ? height : width}
            dur={`${dur}s`}
            calcMode="spline"
            keyTimes="0;1"
            keySplines="0.42,0,0.58,1"
            repeatCount="indefinite"
          />
        </rect>
      </svg>
    </div>
  );
});

export default Decoration;
