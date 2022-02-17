import { useCallback } from 'react';

const RedoAction = () => {
  const handleClick = useCallback(() => {}, []);

  return (
    <div key="redo" onClick={handleClick}>
      重做
    </div>
  );
};

export default RedoAction;
