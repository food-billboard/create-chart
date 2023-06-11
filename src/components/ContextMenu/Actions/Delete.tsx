import { useCallback } from 'react';
import { DeleteOutlined } from '@ant-design/icons';
import { get } from 'lodash';
import InteractiveUtil from '@/utils/Assist/Interactive';
import { useIdPathMap, useAnyDva } from '@/hooks';
import useChildren from './useChildren';
import { CommonActionType } from './type';

const deleteComponentInteractive = (id: string[]) => {
  const { dispatch, getState } = useAnyDva();

  const state = getState().global;
  const params = get(state, 'screenData.config.attr.params');

  InteractiveUtil.deleteComponentInteractive(
    {
      params,
      setParams: (params) => {
        dispatch({
          type: 'global/setScreen',
          value: {
            config: {
              attr: {
                params,
              },
            },
          },
        });
      },
    },
    id,
  );
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
