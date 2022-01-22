import { useCallback } from 'react';

const TopAction = () => {
  const handleClick = useCallback(() => {
    console.log('撤销');
  }, []);

  return (
    <div key="top" onClick={handleClick}>
      置顶
    </div>
  );
};

export default TopAction;
