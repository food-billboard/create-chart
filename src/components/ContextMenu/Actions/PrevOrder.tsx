import { useCallback } from 'react';
import { ArrowUpOutlined } from '@ant-design/icons';
import { useIdPathMap } from '@/hooks';
import useChildren from './useChildren';
import { CommonActionType } from './type';

const PrevOrderAction = (props: CommonActionType) => {
  const { value, setComponent, select, onClick, childrenType, disabled } =
    props;
  const { id } = value;

  const handleClick = useCallback(
    (e: any) => {
      e.stopPropagation();
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
            action: 'move',
            index: 'prev',
            value: {},
          });
        }
        return acc;
      }, []);

      setComponent(updateComponent);
      onClick();
    },
    [id, select, onClick, setComponent],
  );

  const children = useChildren(childrenType, {
    title: '上一个',
    icon: <ArrowUpOutlined />,
    key: 'prev_order',
    onClick: handleClick,
    disabled,
  });

  return children;
};

export default PrevOrderAction;
