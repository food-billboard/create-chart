import { useCallback, useMemo } from 'react';
import { VerticalAlignTopOutlined } from '@ant-design/icons';
import { useIdPathMap } from '@/hooks';
import { CommonActionType } from './type';

const TopAction = (props: CommonActionType) => {
  const { value, path, setComponent, components, select, onClick } = props;
  const {
    id,
    config: {
      style: { zIndex },
    },
  } = value;

  const isTop = useMemo(() => {
    // * 选中多个的情况下，统一显示置顶
    return zIndex == 3 && select.length === 1;
  }, [zIndex, select]);

  const title = useMemo(() => {
    return isTop ? '取消置顶' : '置顶';
  }, [isTop]);

  const handleClick = useCallback(
    (e: any) => {
      e.stopPropagation();
      if (isTop) {
        setComponent({
          value: {
            config: {
              style: {
                zIndex: 2,
              },
            },
          },
          id,
          path,
          action: 'update',
        });
      } else {
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
              index: 'last',
              value: {
                config: {
                  style: {
                    zIndex: 3,
                  },
                },
              },
            });
          }
          return acc;
        }, []);
        setComponent(updateComponent);
      }
      onClick();
    },
    [isTop, id, path, components, select, onClick],
  );

  return (
    <div key="top" onClick={handleClick}>
      <VerticalAlignTopOutlined className="m-r-4" />
      {title}
    </div>
  );
};

export default TopAction;
