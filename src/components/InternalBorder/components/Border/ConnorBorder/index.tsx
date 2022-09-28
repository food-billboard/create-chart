import { ReactNode } from 'react';
import './index.less';

const ConnorBorder = (props: { children?: ReactNode }) => {
  const { children } = props;

  return (
    <>
      <div className={'internal-border-connor-border'}></div>
      {children}
    </>
  );
};

export default ConnorBorder;
