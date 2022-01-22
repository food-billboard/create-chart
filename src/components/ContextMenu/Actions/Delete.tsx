import { useCallback } from 'react';

const DeleteAction = () => {
  const handleClick = useCallback(() => {
    console.log('撤销');
  }, []);

  return (
    <div key="delete" onClick={handleClick}>
      删除
    </div>
  );
};

export default DeleteAction;
