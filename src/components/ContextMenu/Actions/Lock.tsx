import { useCallback } from 'react';

const LockAction = () => {
  const handleClick = useCallback(() => {
    console.log('撤销');
  }, []);

  return (
    <div key="lock" onClick={handleClick}>
      锁定
    </div>
  );
};

export default LockAction;
