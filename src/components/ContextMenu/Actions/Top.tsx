import { useCallback, useMemo } from 'react';
import { VerticalAlignTopOutlined } from '@ant-design/icons';
import { useIdPathMap } from '@/hooks';
import useChildren from './useChildren';
import { CommonActionType } from './type';

const TopAction = (props: CommonActionType) => {
  const {
    value,
    path,
    setComponent,
    components,
    select,
    onClick,
    flag,
    childrenType,
    disabled,
  } = props;
  const {
    id,
    config: {
      style: { zIndex },
    },
  } = value;

  const isTopPc = useMemo(() => {
    // * 选中多个的情况下，统一显示置顶
    return zIndex == 3 && select.length === 1;
  }, [zIndex, select]);

  const isTopH5 = false;

  const isTop = useMemo(() => {
    return flag === 'PC' ? isTopPc : isTopH5;
  }, [isTopPc, isTopH5, flag]);

  const title = useMemo(() => {
    return isTop ? '取消置顶' : '置顶';
  }, [isTop]);

  const handleClickPc = useCallback(() => {
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
  }, [isTop, id, path, components, select]);

  const handleClickH5 = useCallback(() => {
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
          index: 'first',
          value: {},
        });
      }
      return acc;
    }, []);

    setComponent(updateComponent);
  }, [select]);

  const handleClick = useCallback(
    (e: any) => {
      e.stopPropagation();
      flag === 'PC' ? handleClickPc() : handleClickH5();
      onClick();
    },
    [flag, onClick, handleClickH5, handleClickPc],
  );

  const children = useChildren(childrenType, {
    title,
    icon: <VerticalAlignTopOutlined />,
    key: 'top',
    onClick: handleClick,
    disabled,
    checked: isTop,
  });

  return children;
};

export default TopAction;
