import { useCallback } from 'react';

const RedoAction = () => {
  const handleClick = useCallback(() => {
    console.log('撤销');
  }, []);

  return (
    <div key="redo" onClick={handleClick}>
      重做
    </div>
  );
};

export default RedoAction;
