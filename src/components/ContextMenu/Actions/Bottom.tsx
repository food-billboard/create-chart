import { useCallback, useMemo } from 'react';
import { VerticalAlignBottomOutlined } from '@ant-design/icons';
import { useIdPathMap } from '@/hooks';
import useChildren from './useChildren';
import { CommonActionType } from './type';

const BottomAction = (props: CommonActionType) => {
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

  const isBottomPc = useMemo(() => {
    // * 选中多个的情况下，统一显示置底
    return zIndex == 1 && select.length === 1;
  }, [zIndex, select]);

  const isBottomH5 = false;

  const isBottom = useMemo(() => {
    return flag === 'PC' ? isBottomPc : isBottomH5;
  }, [isBottomPc, isBottomH5, flag]);

  const title = useMemo(() => {
    return isBottom ? '取消置底' : '置底';
  }, [isBottom]);

  const handleClickPc = useCallback(() => {
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
  }, [isBottom, id, path, components, select]);

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
          index: 'last',
          value: {},
        });
      }
      return acc;
    }, []);

    setComponent(updateComponent);
  }, [select]);

  const handleClick = useCallback(
    (e: any) => {
      flag === 'PC' ? handleClickPc() : handleClickH5();
      onClick();
    },
    [flag, onClick, handleClickH5, handleClickPc],
  );

  const children = useChildren(childrenType, {
    title,
    icon: <VerticalAlignBottomOutlined />,
    key: 'bottom',
    onClick: handleClick,
    disabled,
    checked: isBottom,
  });

  return children;
};

export default BottomAction;
