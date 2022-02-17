import { useCallback } from 'react';
import { RedoOutlined } from '@ant-design/icons';

const RedoAction = () => {
  const handleClick = useCallback(() => {}, []);

  return (
    <div key="redo" onClick={handleClick}>
      <RedoOutlined className="m-r-4" />
      重做
    </div>
  );
};

export default RedoAction;
