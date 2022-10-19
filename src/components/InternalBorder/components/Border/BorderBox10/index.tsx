import React, { useMemo, forwardRef } from 'react';
import classnames from 'classnames';
import { useAutoResize } from '@/hooks';
import { CommonBorderProps } from '../type';
import { useBorderWrapper } from '../hooks';
import styles from './index.less';

const border = ['left-top', 'right-top', 'left-bottom', 'right-bottom'];
const defaultColor = ['#1d48c4', '#d3e1f8'];

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
    style,
    ...nextProps
  } = useBorderWrapper(props, 'internal-border-10-border', {
    colorType: 'list',
  });

  const mergedColor = useMemo(() => {
    return [color[0] || defaultColor[0], color[1] || defaultColor[1]];
  }, [color]);
  const classNames = useMemo(
    () => classnames(styles['internal-border-10-border'], className),
    [className],
  );

  const newStyle = useMemo(
    () => ({
      boxShadow: `inset 0 0 25px 3px ${mergedColor[0]}`,
      ...style,
    }),
    [style, mergedColor],
  );

  return (
    <div {...nextProps} className={classNames} style={newStyle} ref={domRef}>
      <svg
        className={styles['internal-border-10-border-container']}
        width={width}
        height={height}
      >
        <polygon
          fill={backgroundColor}
          points={`
          4, 0 ${width - 4}, 0 ${width}, 4 ${width}, ${height - 4} ${
            width - 4
          }, ${height}
          4, ${height} 0, ${height - 4} 0, 4
        `}
        />
      </svg>

      {border.map((borderName) => (
        <svg
          width="150px"
          height="150px"
          key={borderName}
          className={classnames(
            styles[`internal-border-10-border-${borderName}`],
            styles['internal-border-10-border-container'],
          )}
        >
          <polygon
            fill={mergedColor[1]}
            points="40, 0 5, 0 0, 5 0, 16 3, 19 3, 7 7, 3 35, 3"
          />
        </svg>
      ))}
      <div className={styles['internal-border-10-border-content']}>
        {children}
      </div>
    </div>
  );
});

export default BorderBox;
