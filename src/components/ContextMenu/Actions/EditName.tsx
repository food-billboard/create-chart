import { useCallback, useMemo } from 'react';
import { EditOutlined } from '@ant-design/icons';
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
      <EditOutlined className="m-r-4" />
      重命名
    </div>
  );
};

export default CopyAction;
