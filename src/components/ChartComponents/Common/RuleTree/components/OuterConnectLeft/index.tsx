import {} from 'react';
import { ReactComponent as Connect } from './index.svg';

const OuterConnectLeft = (props: {}) => {
  return (
    <div
      style={{
        width: '100%',
        height: 24,
        position: 'relative',
      }}
    >
      <Connect />
    </div>
  );
};

export default OuterConnectLeft;
