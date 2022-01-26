import { useCallback, useMemo } from 'react';
import { CommonActionType } from './type';

const CopyAction = (props: CommonActionType) => {
  const { select, onClick } = props;

  const canEdit = useMemo(() => {
    return select.length === 1;
  }, [select]);

  const handleClick = useCallback(() => {
    onClick?.();
  }, [onClick]);

  return (
    <div
      key="copy"
      onClick={handleClick}
      style={{
        display: canEdit ? 'block' : 'none',
      }}
    >
      重命名
    </div>
  );
};

export default CopyAction;
