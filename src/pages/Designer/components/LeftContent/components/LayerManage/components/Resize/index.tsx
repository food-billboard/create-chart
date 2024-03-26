import classnames from 'classnames';
import { throttle } from 'lodash';
import { useState, useRef, useEffect, useCallback } from 'react';
import { CSSProperties, Component } from 'react';
import { useLocalStorage } from '@/hooks';
import styles from './index.less';

export type ResizeLineProps = {
  value: number;
  onChange?: (value: number) => void;
  onResizeEnd?: () => void;
  onResizeStart?: () => void;
  style?: CSSProperties;
  className?: string;
  min: number;
  max: number;
  direction: 1 | -1;
};

class ResizeLine extends Component<ResizeLineProps> {
  sizeValueRef = 0;

  onMouseDown = (e: any) => {
    this.props.onResizeStart?.();
    const clientX = e.clientX;
    this.sizeValueRef = clientX;
    document.addEventListener('mousemove', this.onMouseMove);
    document.addEventListener('mouseup', this.onMouseUp);
  };

  onMouseMove = (e: any) => {
    const { value, onChange, max, min, direction = 1 } = this.props;
    const clientX = e.clientX;
    const moveX = clientX - this.sizeValueRef;
    let newValue = value + moveX * direction;
    this.sizeValueRef = clientX;
    newValue = Math.max(Math.min(max, newValue), min);
    onChange?.(newValue);
  };

  throttleOnMouseMove = throttle(this.onMouseMove, 50);

  onMouseUp = () => {
    document.removeEventListener('mousemove', this.onMouseMove);
    document.removeEventListener('mouseup', this.onMouseUp);
    this.sizeValueRef = 0;
    this.props.onResizeEnd?.();
  };

  render() {
    const { className, style } = this.props;
    return (
      <div
        className={classnames(styles['design-layer-manage-resize'], className)}
        style={style}
        onMouseDown={this.onMouseDown}
      >
        <div className={styles['design-layer-manage-resize-content']}></div>
      </div>
    );
  }
}

export default ResizeLine;

export function useResize(
  config: {
    defaultSize: number;
    localKey: string;
  } & Omit<ResizeLineProps, 'value'>,
): [any, number, boolean] {
  const {
    defaultSize,
    localKey,
    onChange: propsOnChange,
    onResizeEnd: propsOnResizeEnd,
    onResizeStart: propsOnResizeStart,
    ...nextConfig
  } = config;

  const [width = defaultSize, setWidth] = useLocalStorage<number>(
    localKey,
    defaultSize,
  );
  const [stateWidth, setStateWidth] = useState<number>(width);
  const [isResizing, setIsResizing] = useState<boolean>(false);

  const isDeal = useRef<boolean>(false);

  const onChange = useCallback(
    (value) => {
      propsOnChange?.(value);
      setStateWidth(value);
    },
    [propsOnChange],
  );

  const onResizeEnd = useCallback(() => {
    propsOnResizeEnd?.();
    setWidth(stateWidth);
    setIsResizing(false);
  }, [propsOnResizeEnd, stateWidth]);

  const onResizeStart = useCallback(() => {
    setIsResizing(true);
    propsOnResizeStart?.();
  }, []);

  useEffect(() => {
    if (!isDeal.current && width != stateWidth) {
      setStateWidth(stateWidth);
      isDeal.current = true;
    }
  }, [stateWidth, width]);

  return [
    <ResizeLine
      {...nextConfig}
      value={stateWidth}
      onChange={onChange}
      onResizeEnd={onResizeEnd}
      onResizeStart={onResizeStart}
    />,
    stateWidth,
    isResizing,
  ];
}
