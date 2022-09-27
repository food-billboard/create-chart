import { ReactNode } from 'react';
import './index.less';

const RotateLoopBorder = (props: { children?: ReactNode }) => {
  const { children } = props;

  return <div className={'internal-border-rotate-loop-border'}>{children}</div>;
};

export default RotateLoopBorder;
