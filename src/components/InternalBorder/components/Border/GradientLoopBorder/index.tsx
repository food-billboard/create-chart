import { ReactNode } from 'react';
import './index.less';

const GradientLoopBorder = (props: { children?: ReactNode }) => {
  const { children } = props;

  return (
    <div className={'internal-border-gradient-loop-border'}>{children}</div>
  );
};

export default GradientLoopBorder;
