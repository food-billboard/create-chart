import { ReactNode } from 'react';
import './index.less';

const DashedBorder = (props: { children?: ReactNode }) => {
  const { children } = props;

  return (
    <>
      <div className={'internal-border-dashed-border'}></div>
      {children}
    </>
  );
};

export default DashedBorder;
