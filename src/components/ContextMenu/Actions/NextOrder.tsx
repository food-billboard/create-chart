import { useCallback } from 'react';
import { ArrowDownOutlined } from '@ant-design/icons';
import { useIdPathMap } from '@/hooks';
import { CommonActionType } from './type';

const NextOrderAction = (props: CommonActionType) => {
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
            index: 'next',
            value: {},
          });
        }
        return acc;
      }, []);
      setComponent(updateComponent);
      onClick();
    },
    [id, select, onClick],
  );

  return (
    <div key="next_order" onClick={handleClick}>
      <ArrowDownOutlined className="m-r-4" />
      下一个
    </div>
  );
};

export default NextOrderAction;
