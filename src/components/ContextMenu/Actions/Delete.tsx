import { useCallback } from 'react';
import { DeleteOutlined } from '@ant-design/icons';
import { useIdPathMap } from '@/hooks';
import { CommonActionType } from './type';

export const deleteAction = (
  select: string[],
  setComponent: (
    updateComponent: ComponentMethod.SetComponentMethodParamsData[],
  ) => void,
) => {
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
};

const DeleteAction = (props: CommonActionType) => {
  const { value, setComponent, select, onClick } = props;

  const handleClick = useCallback(() => {
    deleteAction(select, setComponent);

    onClick?.();
  }, [select, onClick]);

  return (
    <div key="delete" onClick={handleClick}>
      <DeleteOutlined className="m-r-4" />
      删除
    </div>
  );
};

export default DeleteAction;
