import { useCallback, useMemo } from 'react';
import arrayMove from 'array-move';
import { get, set } from 'lodash';
import { CommonActionType } from './type';

const BottomAction = (props: CommonActionType) => {
  const { value, path, setComponent, setComponentAll, components, select } =
    props;
  const {
    id,
    config: {
      style: { zIndex },
    },
  } = value;

  const isBottom = useMemo(() => {
    // * 选中多个的情况下，统一显示置底
    return zIndex == 1; // && select.length === 1
  }, [zIndex, select]);

  const title = useMemo(() => {
    return isBottom ? '取消置底' : '置底';
  }, [isBottom]);

  const handleClick = useCallback(() => {
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
      setComponent({
        path,
        id,
        action: 'move',
        value: {
          config: {
            style: {
              zIndex: 1,
            },
          },
        },
      });
    }
  }, [isBottom, id, path, components, setComponentAll]);

  return (
    <div key="bottom" onClick={handleClick}>
      {title}
    </div>
  );
};

export default BottomAction;
