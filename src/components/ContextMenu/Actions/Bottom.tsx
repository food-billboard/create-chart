import { useCallback, useMemo } from 'react';
import { VerticalAlignBottomOutlined } from '@ant-design/icons';
import { useIdPathMap } from '@/hooks';
import { CommonActionType } from './type';

const BottomAction = (props: CommonActionType) => {
  const { value, path, setComponent, components, select, onClick } = props;
  const {
    id,
    config: {
      style: { zIndex },
    },
  } = value;

  const isBottom = useMemo(() => {
    // * 选中多个的情况下，统一显示置底
    return zIndex == 1 && select.length === 1;
  }, [zIndex, select]);

  const title = useMemo(() => {
    return isBottom ? '取消置底' : '置底';
  }, [isBottom]);

  const handleClick = useCallback(
    (e: any) => {
      e.stopPropagation();
      if (isBottom) {
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
              index: 0,
              value: {
                config: {
                  style: {
                    zIndex: 1,
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
    [isBottom, id, path, components, select, onClick],
  );

  return (
    <div key="bottom" onClick={handleClick}>
      <VerticalAlignBottomOutlined className="m-r-4" />
      {title}
    </div>
  );
};

export default BottomAction;
