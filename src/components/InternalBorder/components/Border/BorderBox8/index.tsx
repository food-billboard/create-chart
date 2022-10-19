import React, { useMemo, forwardRef, useState } from 'react';
import classnames from 'classnames';
import { nanoid } from 'nanoid';
import { useAutoResize } from '@/hooks';
import { CommonBorderProps } from '../type';
import { useBorderWrapper } from '../hooks';
import styles from './index.less';

const defaultColor = ['#235fa7', '#4fd2dd'];

export type IProps = CommonBorderProps & {
  color?: string[];
  backgroundColor?: string;
  reverse?: boolean;
  dur?: number;
};

const BorderBox = forwardRef((props: IProps, ref) => {
  const { width, height, domRef } = useAutoResize(ref);

  const {
    origin: {
      props: {
        color = [],
        backgroundColor = 'transparent',
        reverse = false,
        dur = 1,
      },
    },
    children,
    className,
    ...nextProps
  } = useBorderWrapper(props, 'internal-border-8-border', {
    colorType: 'list',
  });

  const [{ path, gradient, mask }] = useState(() => {
    const id = nanoid();

    return {
      path: `border-box-8-path-${id}`,
      gradient: `border-box-8-gradient-${id}`,
      mask: `border-box-8-mask-${id}`,
    };
  });

  const pathD = useMemo(
    () =>
      reverse
        ? `M 2.5, 2.5 L 2.5, ${height - 2.5} L ${width - 2.5}, ${
            height - 2.5
          } L ${width - 2.5}, 2.5 L 2.5, 2.5`
        : `M2.5, 2.5 L${width - 2.5}, 2.5 L${width - 2.5}, ${
            height - 2.5
          } L2.5, ${height - 2.5} L2.5, 2.5`,
    [width, height, reverse],
  );

  const mergedColor = useMemo(() => {
    return [color[0] || defaultColor[0], color[1] || defaultColor[1]];
  }, [color]);

  const length = useMemo(() => (width + height - 5) * 2, [width, height]);

  const classNames = useMemo(
    () => classnames(styles['internal-border-8-border '], className),
    [className],
  );

  return (
    <div {...nextProps} className={classNames} ref={domRef}>
      <svg
        className={styles['internal-border-8-border-container']}
        width={width}
        height={height}
      >
        <defs>
          <path id={path} d={pathD} fill="transparent" />
          <radialGradient id={gradient} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#fff" stopOpacity="1" />
            <stop offset="100%" stopColor="#fff" stopOpacity="0" />
          </radialGradient>

          <mask id={mask}>
            <circle cx="0" cy="0" r="150" fill={`url(#${gradient})`}>
              <animateMotion
                dur={`${dur}s`}
                path={pathD}
                rotate="auto"
                repeatCount="indefinite"
              />
            </circle>
          </mask>
        </defs>

        <polygon
          fill={backgroundColor}
          points={`5, 5 ${width - 5}, 5 ${width - 5} ${height - 5} 5, ${
            height - 5
          }`}
        />

        <use stroke={mergedColor[0]} strokeWidth="1" href={`#${path}`} />

        <use
          stroke={mergedColor[1]}
          strokeWidth="3"
          href={`#${path}`}
          mask={`url(#${mask})`}
        >
          <animate
            attributeName="stroke-dasharray"
            from={`0, ${length}`}
            to={`${length}, 0`}
            dur={`${dur}s`}
            repeatCount="indefinite"
          />
        </use>
      </svg>

      <div className={styles['internal-border-8-border-content']}>
        {children}
      </div>
    </div>
  );
});

export default BorderBox;
