import React, { useMemo, forwardRef, CSSProperties } from 'react';
import classnames from 'classnames';
import { useAutoResize } from '../../InternalBorder/components/Border/hooks';
import styles from './index.less';

const defaultColor = ['#fff', '#0de7c2'];

const pointSideLength = 2.5;

const halfPointSideLength = pointSideLength / 2;

const svgWH = [200, 50];

const rowNum = 4;

const rowPoints = 20;

function getPoints() {
  const [w, h] = svgWH;

  const horizontalGap = w / (rowPoints + 1);
  const verticalGap = h / (rowNum + 1);

  const points = new Array(rowNum)
    .fill(0)
    .map((foo, i) =>
      new Array(rowPoints)
        .fill(0)
        .map((foo, j) => [horizontalGap * (j + 1), verticalGap * (i + 1)]),
    );

  return points.reduce((all, item) => [...all, ...item], []);
}

export type IProps = {
  className?: string;
  style?: CSSProperties;
  color?: string[];
};

const Decoration = forwardRef((props: IProps, ref) => {
  const { width, height, domRef } = useAutoResize(ref);

  const { color = [], style, className } = props;

  function calcSVGData() {
    const points = getPoints();

    return {
      points,
      rects: [points[rowPoints * 2 - 1], points[rowPoints * 2 - 3]],
      svgScale: [width / svgWH[0], height / svgWH[1]],
    };
  }

  const mergedColor = useMemo(() => {
    return [color[0] || defaultColor[0], color[1] || defaultColor[1]];
  }, [color]);

  const { svgScale, points, rects } = useMemo(calcSVGData, [width, height]);

  const classNames = useMemo(
    () => classnames(styles['component-decoration-1'], className),
    [className],
  );

  return (
    <div className={classNames} style={style} ref={domRef}>
      <svg
        width={`${svgWH[0]}px`}
        height={`${svgWH[1]}px`}
        style={{ transform: `scale(${svgScale[0]},${svgScale[1]})` }}
      >
        {points.reduce<any>((prev, point, i) => {
          return Math.random() > 0.6
            ? [
                ...prev,
                <rect
                  key={i}
                  fill={mergedColor[0]}
                  x={point[0] - halfPointSideLength}
                  y={point[1] - halfPointSideLength}
                  width={pointSideLength}
                  height={pointSideLength}
                >
                  {Math.random() > 0.6 && (
                    <animate
                      attributeName="fill"
                      values={`${mergedColor[0]};transparent`}
                      dur="1s"
                      begin={Math.random() * 2}
                      repeatCount="indefinite"
                    />
                  )}
                </rect>,
              ]
            : prev;
        }, [])}
        {!!rects[0] && (
          <rect
            fill={mergedColor[1]}
            x={rects[0][0] - pointSideLength}
            y={rects[0][1] - pointSideLength}
            width={pointSideLength * 2}
            height={pointSideLength * 2}
          >
            <animate
              attributeName="width"
              values={`0;${pointSideLength * 2}`}
              dur="2s"
              repeatCount="indefinite"
            />
            <animate
              attributeName="height"
              values={`0;${pointSideLength * 2}`}
              dur="2s"
              repeatCount="indefinite"
            />
            <animate
              attributeName="x"
              values={`${rects[0][0]};${rects[0][0] - pointSideLength}`}
              dur="2s"
              repeatCount="indefinite"
            />
            <animate
              attributeName="y"
              values={`${rects[0][1]};${rects[0][1] - pointSideLength}`}
              dur="2s"
              repeatCount="indefinite"
            />
          </rect>
        )}
        {!!rects[1] && (
          <rect
            fill={mergedColor[1]}
            x={rects[1][0] - 40}
            y={rects[1][1] - pointSideLength}
            width="40"
            height={pointSideLength * 2}
          >
            <animate
              attributeName="width"
              values="0;40;0"
              dur="2s"
              repeatCount="indefinite"
            />
            <animate
              attributeName="x"
              values={`${rects[1][0]};${rects[1][0] - 40};${rects[1][0]}`}
              dur="2s"
              repeatCount="indefinite"
            />
          </rect>
        )}
      </svg>
    </div>
  );
});

export default Decoration;
