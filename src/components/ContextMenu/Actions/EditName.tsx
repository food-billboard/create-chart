import { useCallback, useMemo } from 'react';
import { EditOutlined } from '@ant-design/icons';
import useChildren from './useChildren';
import { CommonActionType } from './type';

const CopyAction = (props: CommonActionType) => {
  const { select, onClick, childrenType, disabled } = props;

  const canEdit = useMemo(() => {
    return select.length === 1;
  }, [select]);

  const handleClick = useCallback(() => {
    onClick?.();
  }, [onClick]);

  const children = useChildren(childrenType, {
    title: '重命名',
    icon: <EditOutlined />,
    key: 'edit_name',
    onClick: handleClick,
    disabled,
    style: canEdit ? {} : { display: 'none' },
  });

  return children;
};

export default CopyAction;
