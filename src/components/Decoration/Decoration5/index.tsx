import React, { useMemo, forwardRef, CSSProperties } from 'react';
import classnames from 'classnames';
import { useAutoResize } from '../../InternalBorder/components/Border/hooks';
import styles from './index.less';

const defaultColor = ['#3f96a5', '#3f96a5'];

function mulAdd(nums: number[]) {
  return nums
    .filter((item) => typeof item === 'number')
    .reduce((all, num) => all + num, 0);
}

export function getTwoPointDistance(pointOne: number[], pointTwo: number[]) {
  const minusX = Math.abs(pointOne[0] - pointTwo[0]);

  const minusY = Math.abs(pointOne[1] - pointTwo[1]);

  return Math.sqrt(minusX * minusX + minusY * minusY);
}

export function getPolylineLength(points: number[][]) {
  const lineSegments = new Array(points.length - 1)
    .fill(0)
    .map((foo, i) => [points[i], points[i + 1]]);

  const lengths = lineSegments.map((item) =>
    getTwoPointDistance(item[0], item[1]),
  );

  return mulAdd(lengths);
}

export type IProps = {
  className?: string;
  style?: CSSProperties;
  color?: string[];
  dur?: number;
};

const Decoration = forwardRef((props: IProps, ref) => {
  const { width, height, domRef } = useAutoResize(ref);

  const { className, dur = 1.2, style, color = [] } = props;

  function calcSVGData() {
    let line1Points: any = [
      [0, height * 0.2],
      [width * 0.18, height * 0.2],
      [width * 0.2, height * 0.4],
      [width * 0.25, height * 0.4],
      [width * 0.27, height * 0.6],
      [width * 0.72, height * 0.6],
      [width * 0.75, height * 0.4],
      [width * 0.8, height * 0.4],
      [width * 0.82, height * 0.2],
      [width, height * 0.2],
    ];

    let line2Points: any = [
      [width * 0.3, height * 0.8],
      [width * 0.7, height * 0.8],
    ];

    const line1Length = getPolylineLength(line1Points);
    const line2Length = getPolylineLength(line2Points);

    line1Points = line1Points.map((point: any) => point.join(',')).join(' ');
    line2Points = line2Points.map((point: any) => point.join(',')).join(' ');

    return { line1Points, line2Points, line1Length, line2Length };
  }

  const mergedColor = useMemo(() => {
    return [color[0] || defaultColor[0], color[1] || defaultColor[1]];
  }, [color]);

  const { line1Points, line2Points, line1Length, line2Length } = useMemo(
    calcSVGData,
    [width, height],
  );

  const classNames = useMemo(
    () => classnames(styles['component-decoration-5'], className),
    [className],
  );

  return (
    <div className={classNames} style={style} ref={domRef}>
      <svg width={width} height={height}>
        <polyline
          fill="transparent"
          stroke={mergedColor[0]}
          strokeWidth="3"
          points={line1Points}
        >
          <animate
            attributeName="stroke-dasharray"
            attributeType="XML"
            from={`0, ${line1Length / 2}, 0, ${line1Length / 2}`}
            to={`0, 0, ${line1Length}, 0`}
            dur={`${dur}s`}
            begin="0s"
            calcMode="spline"
            keyTimes="0;1"
            keySplines="0.4,1,0.49,0.98"
            repeatCount="indefinite"
          />
        </polyline>
        <polyline
          fill="transparent"
          stroke={mergedColor[1]}
          strokeWidth="2"
          points={line2Points}
        >
          <animate
            attributeName="stroke-dasharray"
            attributeType="XML"
            from={`0, ${line2Length / 2}, 0, ${line2Length / 2}`}
            to={`0, 0, ${line2Length}, 0`}
            dur={`${dur}s`}
            begin="0s"
            calcMode="spline"
            keyTimes="0;1"
            keySplines=".4,1,.49,.98"
            repeatCount="indefinite"
          />
        </polyline>
      </svg>
    </div>
  );
});

export default Decoration;
