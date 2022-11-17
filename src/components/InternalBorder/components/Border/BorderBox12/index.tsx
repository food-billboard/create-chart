import React, { useMemo, forwardRef, useRef, CSSProperties } from 'react';
import classnames from 'classnames';
import { nanoid } from 'nanoid';
import { CommonBorderProps } from '../type';
import { useBorderWrapper, useAutoResize } from '../hooks';
import styles from './index.less';

const defaultColor = ['#2e6099', '#7ce7fd'];

export type IProps = CommonBorderProps & {
  color?: string[];
  backgroundColor?: string;
};

const BorderBox = forwardRef((props: IProps, ref) => {
  const filterId = useRef(`border-box-12-filterId-${nanoid()}`).current;

  const { width, height, domRef } = useAutoResize(ref);

  const {
    origin: {
      props: { backgroundColor = 'transparent' },
      stringColor: color,
    },
    children,
    className,
    ...nextProps
  } = useBorderWrapper(props, 'internal-border-12-border', {
    colorType: 'list',
  });

  const mergedColor = useMemo(() => {
    return [color[0] || defaultColor[0], color[1] || defaultColor[1]];
  }, [color]);

  const classNames = useMemo(
    () => classnames(styles['internal-border-12-border'], className),
    [className],
  );

  return (
    <div className={classNames} ref={domRef}>
      <svg
        className={styles['internal-border-12-border-container']}
        width={width}
        height={height}
      >
        <defs>
          <filter id={filterId} height="150%" width="150%" x="-25%" y="-25%">
            <feMorphology
              operator="dilate"
              radius="1"
              in="SourceAlpha"
              result="thicken"
            />
            <feGaussianBlur in="thicken" stdDeviation="2" result="blurred" />
            <feFlood
              // floodColor={fade(mergedColor[1] || defaultColor[1], 70)}
              floodColor={mergedColor[1]}
              result="glowColor"
            >
              <animate
                attributeName="flood-color"
                //     values={`
                //   ${fade(mergedColor[1] || defaultColor[1], 70)};
                //   ${fade(mergedColor[1] || defaultColor[1], 30)};
                //   ${fade(mergedColor[1] || defaultColor[1], 70)};
                // `}
                values={mergedColor[1]}
                dur="3s"
                begin="0s"
                repeatCount="indefinite"
              />
            </feFlood>
            <feComposite
              in="glowColor"
              in2="blurred"
              operator="in"
              result="softGlowColored"
            />
            <feMerge>
              <feMergeNode in="softGlowColored" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {width && height && (
          <path
            fill={backgroundColor}
            strokeWidth="2"
            stroke={mergedColor[0]}
            d={`
            M15 5 L ${width - 15} 5 Q ${width - 5} 5, ${width - 5} 15
            L ${width - 5} ${height - 15} Q ${width - 5} ${height - 5}, ${
              width - 15
            } ${height - 5}
            L 15, ${height - 5} Q 5 ${height - 5} 5 ${height - 15} L 5 15
            Q 5 5 15 5
          `}
          />
        )}

        <path
          strokeWidth="2"
          fill="transparent"
          strokeLinecap="round"
          filter={`url(#${filterId})`}
          stroke={mergedColor[1]}
          d={`M 20 5 L 15 5 Q 5 5 5 15 L 5 20`}
        />

        <path
          strokeWidth="2"
          fill="transparent"
          strokeLinecap="round"
          filter={`url(#${filterId})`}
          stroke={mergedColor[1]}
          d={`M ${width - 20} 5 L ${width - 15} 5 Q ${width - 5} 5 ${
            width - 5
          } 15 L ${width - 5} 20`}
        />

        <path
          strokeWidth="2"
          fill="transparent"
          strokeLinecap="round"
          filter={`url(#${filterId})`}
          stroke={mergedColor[1]}
          d={`
          M ${width - 20} ${height - 5} L ${width - 15} ${height - 5}
          Q ${width - 5} ${height - 5} ${width - 5} ${height - 15}
          L ${width - 5} ${height - 20}
        `}
        />

        <path
          strokeWidth="2"
          fill="transparent"
          strokeLinecap="round"
          filter={`url(#${filterId})`}
          stroke={mergedColor[1]}
          d={`
          M 20 ${height - 5} L 15 ${height - 5}
          Q 5 ${height - 5} 5 ${height - 15}
          L 5 ${height - 20}
        `}
        />
      </svg>
      <div
        {...nextProps}
        className={styles['internal-border-12-border-content']}
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
