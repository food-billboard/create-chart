import { ReactNode } from 'react';
import './index.less';

const GradientBorder = (props: { children?: ReactNode }) => {
  const { children } = props;

  return <div className={'internal-border-gradient-border'}>{children}</div>;
};

export default GradientBorder;
