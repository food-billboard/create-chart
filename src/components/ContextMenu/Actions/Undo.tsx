import { useCallback } from 'react';
import { CommonActionType } from './type';

const UndoAction = (props: CommonActionType) => {
  const handleClick = useCallback(() => {}, []);

  return (
    <div key="undo" onClick={handleClick}>
      撤销
    </div>
  );
};

export default UndoAction;
