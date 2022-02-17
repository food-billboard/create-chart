import { useCallback } from 'react';
import { UndoOutlined } from '@ant-design/icons';
import { CommonActionType } from './type';

const UndoAction = (props: CommonActionType) => {
  const handleClick = useCallback(() => {}, []);

  return (
    <div key="undo" onClick={handleClick}>
      <UndoOutlined className="m-r-4" />
      撤销
    </div>
  );
};

export default UndoAction;
