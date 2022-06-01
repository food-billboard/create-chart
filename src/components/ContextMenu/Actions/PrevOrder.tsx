import { useCallback } from 'react';
import { ArrowUpOutlined } from '@ant-design/icons';
import { useIdPathMap } from '@/hooks';
import { CommonActionType } from './type';

const PrevOrderAction = (props: CommonActionType) => {
  const { value, setComponent, select, onClick } = props;
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
      <ArrowUpOutlined className="m-r-4" />
      上一个
    </div>
  );
};

export default PrevOrderAction;
