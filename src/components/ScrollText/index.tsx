import { ReactNode, CSSProperties } from 'react';
import { merge } from 'lodash';
import classnames from 'classnames';
import styles from './index.less';

// function
// ease ease-in ease-in-out ease-out linear

const ScrollText = (props: {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  animation?: {
    speed?: number;
    delay?: number;
    count?: number | 'infinite';
    timeFunction?: string;
  };
}) => {
  const {
    children,
    className,
    style,
    animation: {
      speed = 5,
      delay = 0,
      count = 'infinite',
      timeFunction = 'linear',
    } = {},
  } = props;

  return (
    <div
      className={classnames(
        styles['component-scroll-text'],
        'pos-re',
        'w-100',
        'h-100',
        className,
      )}
      style={merge({}, style)}
    >
      <div
        className={styles['component-scroll-text-content']}
        style={{
          animationDuration: speed + 's',
          animationDelay: delay + 's',
          animationIterationCount: count,
          animationTimingFunction: timeFunction,
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default ScrollText;
