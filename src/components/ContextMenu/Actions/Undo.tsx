import { useCallback } from 'react';
import { CommonActionType } from './type';

const UndoAction = (props: CommonActionType) => {
  const handleClick = useCallback(() => {
    console.log('撤销');
  }, []);

  return (
    <div key="undo" onClick={handleClick}>
      撤销
    </div>
  );
};

export default UndoAction;
