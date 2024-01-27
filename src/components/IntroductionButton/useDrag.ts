import { useGetState } from 'ahooks';
import { debounce } from 'lodash';
import {
  useCallback,
  useMemo,
  useRef,
  useState,
  CSSProperties,
  useEffect,
} from 'react';
import { BUTTON_LIST } from './constants';

export default function useDrag(
  defaultPosition: {
    right: number;
    bottom: number;
  } = {
    right: 24,
    bottom: 80,
  },
) {
  const [buttonPosition, setButtonPosition, getButtonPosition] =
    useGetState(defaultPosition);
  const [isDragging, setIsDragging] = useState(false);

  const dragInfo = useRef({
    transitionEnd: true,
  });
  const windowSize = useRef({
    width: 0,
    height: 0,
  });

  const currentExtraStyle: CSSProperties = useMemo(() => {
    if (isDragging) return {};
    return {
      transitionProperty: 'right, bottom',
      transitionDuration: '1s',
    };
  }, [isDragging]);

  const onDragStart = (e: any) => {
    if (!dragInfo.current.transitionEnd) return;
    setIsDragging(true);
    document.addEventListener('mousemove', onDrag);
    document.addEventListener('mouseup', onDragEnd);
  };

  function onDrag(e: any) {
    const clientX = e.clientX;
    const clientY = e.clientY;
    let newRight = windowSize.current.width - clientX;
    let newBottom = windowSize.current.height - clientY;
    newRight = Math.max(Math.min(windowSize.current.width - 40, newRight), 0);
    newBottom = Math.max(
      Math.min(windowSize.current.height - 40, newBottom),
      0,
    );
    setButtonPosition({
      right: newRight,
      bottom: newBottom,
    });
  }

  function onDragEnd() {
    setIsDragging(false);
    const { right, bottom } = getButtonPosition();

    let newRight = right;
    let newBottom = bottom;

    const maxRight = windowSize.current.width - 40 - 24;
    const minRight = 24;
    const maxBottom =
      windowSize.current.height -
      50 * BUTTON_LIST().filter((item) => item.visible).length -
      80;
    const minBottom = 24;

    const maxRightAbs = Math.abs(maxRight - right);
    const minRightAbs = Math.abs(minRight - right);
    const maxBottomAbs = Math.abs(maxBottom - bottom);
    const minBottomAbs = Math.abs(minBottom - bottom);

    const minDistance = Math.min(
      maxRightAbs,
      minRightAbs,
      maxBottomAbs,
      minBottomAbs,
    );

    // 左
    if (minDistance === maxRightAbs) {
      newRight = maxRight;
    }
    // 右
    else if (minDistance === minRightAbs) {
      newRight = minRight;
    }
    // 上
    else if (minDistance === maxBottomAbs) {
      // ? antd当前版本的按钮弹出只能是往上，所以没有办法粘附在最上层，所以还是将他贴到左右
      newRight = maxRightAbs > minRightAbs ? minRight : maxRight;
      newBottom = maxBottom;
    }
    // 下
    else {
      newBottom = minBottom;
    }

    setButtonPosition({
      right: newRight,
      bottom: newBottom,
    });
    document.removeEventListener('mousemove', onDrag);
    document.removeEventListener('mouseup', onDragEnd);
  }

  const onTransitionEnd = useCallback(() => {
    dragInfo.current.transitionEnd = true;
  }, []);

  useEffect(() => {
    function _onResize() {
      const windowWidth = document.body.offsetWidth;
      const windowHeight = document.body.offsetHeight;
      windowSize.current = {
        width: windowWidth,
        height: windowHeight,
      };
    }
    const onResize = debounce(_onResize, 500);

    onResize();
    document.addEventListener('resize', onResize);
    return () => {
      document.removeEventListener('resize', onResize);
    };
  }, []);

  return {
    style: {
      ...buttonPosition,
      ...currentExtraStyle,
    },
    isDragging,
    onMouseDown: onDragStart,
    onTransitionEnd: onTransitionEnd,
  };
}
