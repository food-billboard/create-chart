import {} from 'react';
import { ReactComponent as Logo } from './index.svg';

const OuterConnectLeft = (props: {}) => {
  return (
    <div
      style={{
        width: 124,
        height: 24,
        position: 'relative',
      }}
    >
      <Logo />
    </div>
  );
};

export default OuterConnectLeft;
