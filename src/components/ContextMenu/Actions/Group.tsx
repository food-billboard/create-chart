import { useCallback } from 'react';

const GroupAction = () => {
  const handleClick = useCallback(() => {
    console.log('撤销');
  }, []);

  return (
    <div key="group" onClick={handleClick}>
      成组
    </div>
  );
};

export default GroupAction;
