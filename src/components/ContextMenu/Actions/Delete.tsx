import { useCallback } from 'react';
import { DeleteOutlined } from '@ant-design/icons';
import { useIdPathMap } from '@/hooks';
import { CommonActionType } from './type';

const DeleteAction = (props: CommonActionType) => {
  const { value, setComponent, select, onClick } = props;

  const { id } = value;

  const handleClick = useCallback(() => {
    const idPathMap = useIdPathMap();

    const updateComponent = select.reduce<
      ComponentMethod.SetComponentMethodParamsData[]
    >((acc, cur) => {
      const target = idPathMap[cur];
      if (target) {
        const { path, id } = target;
        acc.push({
          path,
          id,
          action: 'delete',
          value: {},
        });
      }
      return acc;
    }, []);

    setComponent(updateComponent);

    onClick?.();
  }, [select, id, onClick]);

  return (
    <div key="delete" onClick={handleClick}>
      <DeleteOutlined className="m-r-4" />
      删除
    </div>
  );
};

export default DeleteAction;
