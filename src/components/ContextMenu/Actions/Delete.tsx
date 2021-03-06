import { useCallback } from 'react';
import { DeleteOutlined } from '@ant-design/icons';
import { getDvaApp } from 'umi';
import { get } from 'lodash';
import InteractiveUtil from '@/utils/Assist/Interactive';
import { useIdPathMap } from '@/hooks';
import { CommonActionType } from './type';

const deleteComponentInteractive = (id: string[]) => {
  const app = getDvaApp();
  const dispatch = app._store.dispatch;
  const { state } =
    app._models.find((item: any) => item.namespace === 'global') || {};
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
  const { setComponent, select, onClick, setSelect } = props;

  const handleClick = useCallback(() => {
    deleteAction(select, setComponent, setSelect);

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
