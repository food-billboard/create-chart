import { useCallback } from 'react';
import { DeleteOutlined } from '@ant-design/icons';
import { useIdPathMap } from '@/hooks';
import {
  GLOBAL_EVENT_EMITTER,
  EVENT_NAME_MAP,
} from '@/utils/Assist/EventEmitter';
import useChildren from './useChildren';
import { CommonActionType } from './type';

// 删除组件后，手动删除其相关的关联属性
const deleteComponentInteractive = (id: string[]) => {
  GLOBAL_EVENT_EMITTER.emit(EVENT_NAME_MAP.COMPONENT_DELETE_ACTION, id);
};

export const deleteAction = (
  select: string[],
  setComponent: (
    updateComponent: ComponentMethod.SetComponentMethodParamsData[],
  ) => void,
  setSelect: (value: string[]) => void,
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

  deleteComponentInteractive(select);

  setSelect([]);
};

const DeleteAction = (props: CommonActionType) => {
  const { setComponent, select, onClick, setSelect, childrenType, disabled } =
    props;

  const handleClick = useCallback(() => {
    deleteAction(select, setComponent, setSelect);

    onClick?.();
  }, [select, onClick]);

  const children = useChildren(childrenType, {
    title: '删除',
    icon: <DeleteOutlined />,
    key: 'delete',
    onClick: handleClick,
    disabled,
  });

  return children;
};

export default DeleteAction;
