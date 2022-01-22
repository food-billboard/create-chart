import { useCallback } from 'react';

const ShowAction = () => {
  const handleClick = useCallback(() => {
    console.log('撤销');
  }, []);

  return (
    <div key="show" onClick={handleClick}>
      置底
    </div>
  );
};

export default ShowAction;
