import classnames from 'classnames';
import { ReactNode, CSSProperties } from 'react';
import ReactMarquee from 'react-fast-marquee';
import styles from './index.less';

export type Props = {
  open?: boolean;
  wrapperStyle?: CSSProperties;
  wrapperClassName?: string;

  style?: CSSProperties;
  className?: string;
  autoFill?: boolean;
  play?: boolean;
  pauseOnHover?: boolean;
  pauseOnClick?: boolean;
  direction?: 'left' | 'right' | 'up' | 'down';
  speed?: number;
  delay?: number;
  loop?: number;
  gradient?: boolean;
  gradientColor?: string;
  gradientWidth?: number | string;
  onFinish?: () => void;
  onCycleComplete?: () => void;
  onMount?: () => void;
  children?: ReactNode;
};

const Marquee = ({
  open,
  wrapperClassName,
  wrapperStyle,
  ...nextProps
}: Props) => {
  if (!open) return null;

  return (
    <div className={classnames('w-100', wrapperClassName)} style={wrapperStyle}>
      <ReactMarquee {...nextProps} />
    </div>
  );
};

export const ComponentDemoTooltip = (props: Props) => {
  const { wrapperClassName, children, ...nextProps } = props;

  return (
    <Marquee
      speed={25}
      {...nextProps}
      wrapperClassName={classnames(
        wrapperClassName,
        styles['component-demo-tooltip'],
      )}
    >
      {children ||
        '当前lottie动画为默认动画，只在设计阶段显示，请设置自定义的lottie动画。'}
    </Marquee>
  );
};

export default Marquee;
