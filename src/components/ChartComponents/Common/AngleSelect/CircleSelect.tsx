import { throttle } from 'lodash';
import { useCallback, useEffect, useRef, useState } from 'react';
import { connect } from 'umi';
import { ConnectState } from '@/models/connect';
import styles from './index.less';

const CircleSelect = (props: {
  value?: number;
  onChange?: (value: number) => void;
  theme: ComponentData.TScreenTheme;
}) => {
  const { value = 0, onChange } = props;

  const [stateValue, setStateValue] = useState<number>(value);

  const selectRef = useRef<{
    x: number;
    y: number;
  }>({
    x: 0,
    y: 0,
  });

  const angle = (
    start: { x: number; y: number },
    end: { x: number; y: number },
  ) => {
    const diffX = end.x - start.x;
    const diffY = end.y - start.y;

    return (360 * Math.atan(diffY / diffX)) / (2 * Math.PI);
  };

  const getRotate = (e: any) => {
    const { x = 0, y = 0 } = selectRef.current || {};
    const centerX = x + 9;
    const centerY = y + 9;

    const { clientX, clientY } = e;

    const pointX = clientX - centerX;
    const pointY = centerY - clientY;

    const rotate = angle(
      { x: 0, y: 0 },
      {
        x: pointX,
        y: pointY,
      },
    );

    // 第三象限
    if (pointX < 0 && pointY < 0) {
      return 90 - rotate + 180;
    }
    // 第四象限
    else if (pointX > 0 && pointY < 0) {
      return 90 - rotate;
    }
    // 第一个象限
    else if (pointX > 0 && pointY > 0) {
      return 90 - rotate;
    }

    // 第二象限
    return -90 - rotate;
  };

  const _onMouseMove = useCallback((e: any) => {
    const rotate = getRotate(e);
    setStateValue(rotate);
  }, []);

  const onMouseMove = throttle(_onMouseMove, 50);

  const onMouseUp = useCallback(
    (e: any) => {
      const rotate = getRotate(e);
      setStateValue(rotate);

      onChange?.(rotate);

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    },
    [onMouseMove, onChange],
  );

  const onMouseDown = useCallback(
    (e: any) => {
      const target = e.target;
      const { x = 0, y = 0 } = target.getBoundingClientRect() || {};
      selectRef.current = {
        x,
        y,
      };

      const rotate = getRotate(e);
      setStateValue(Math.floor(rotate));

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    },
    [onMouseMove, onMouseUp],
  );

  useEffect(() => {
    setStateValue(value);
  }, [value]);

  return (
    <div
      className={styles['component-circle-select']}
      style={{
        // @ts-ignore
        '--component-circle-select-value': `rotate(${stateValue}deg)`,
      }}
      onMouseDown={onMouseDown}
    />
  );
};

export default connect(
  (state: ConnectState) => {
    return {
      theme: state.global.screenData.config.attr.theme,
    };
  },
  () => ({}),
)(CircleSelect);
