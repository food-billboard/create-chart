import { useCallback } from 'react';

const CopyAction = () => {
  const handleClick = useCallback(() => {
    console.log('撤销');
  }, []);

  return (
    <div key="copy" onClick={handleClick}>
      复制
    </div>
  );
};

export default CopyAction;
