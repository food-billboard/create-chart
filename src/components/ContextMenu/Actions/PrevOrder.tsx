import { useCallback } from 'react';
import { useIdPathMap } from '@/hooks';
import { CommonActionType } from './type';

const PrevOrderAction = (props: CommonActionType) => {
  const {
    value,
    path,
    setComponent,
    setComponentAll,
    components,
    select,
    onClick,
  } = props;
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

  return (
    <div key="prev_order" onClick={handleClick}>
      上一个
    </div>
  );
};

export default PrevOrderAction;
