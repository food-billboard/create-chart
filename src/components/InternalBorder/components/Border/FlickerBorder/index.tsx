import { ReactNode } from 'react';
import './index.less';

const FlickerBorder = (props: { children?: ReactNode }) => {
  const { children } = props;

  return (
    <>
      <div className={'internal-border-flicker-border'}></div>
      {children}
    </>
  );
};

export default FlickerBorder;
