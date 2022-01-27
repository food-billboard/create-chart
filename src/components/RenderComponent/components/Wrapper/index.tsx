import { ReactNode, CSSProperties, useCallback } from 'react';
import { Rnd, Props, RndDragCallback, RndResizeCallback } from 'react-rnd';
import { merge } from 'lodash';

const ComponentWrapper = (
  props: {
    children?: ReactNode;
    className?: string;
    style?: CSSProperties;
    select?: string[];
    disabled?: boolean;
    setComponent: (
      callback: (
        value: ComponentData.TComponentData,
      ) => SuperPartial<ComponentData.TComponentData>,
    ) => void;
  } & Partial<Props>,
) => {
  const {
    children,
    className,
    style,
    propsOnDragStop,
    propsOnResizeStop,
    select,
    disabled,
    setComponent,
    ...nextProps
  } = props;

  const { position } = nextProps;

  const onDragStop: RndDragCallback = useCallback(
    (event, data) => {
      const { x, y } = data;
      const { x: prevX = 0, y: prevY = 0 } = position || {};

      // * 点击不触发刷新
      if (Math.abs(x - prevX) < 5 && Math.abs(y - prevY) < 5) return;

      setComponent(() => {
        return {
          config: {
            style: {
              left: x,
              top: y,
            },
          },
        };
      });
      propsOnDragStop?.();
    },
    [propsOnDragStop, setComponent, position],
  );

  const onResizeStop: RndResizeCallback = useCallback(
    (e, direction, ref, delta, position) => {
      const { width, height } = delta;
      // * 点击不触发刷新
      if (Math.abs(width) < 5 && Math.abs(height) < 5) return;

      setComponent(() => {
        return {
          config: {
            style: {
              width: parseInt(ref.style.width) || 20,
              height: parseInt(ref.style.height) || 20,
              left: position.x,
              top: position.y,
            },
          },
        };
      });
      propsOnResizeStop?.();
    },
    [propsOnResizeStop],
  );

  return (
    <Rnd
      enableResizing={!disabled}
      disableDragging={disabled}
      className={className}
      style={merge({}, style)}
      default={{
        x: 0,
        y: 0,
        width: 320,
        height: 200,
      }}
      onDragStop={onDragStop}
      onResizeStop={onResizeStop}
      resizeHandleComponent={{}}
      {...nextProps}
    >
      {children}
    </Rnd>
  );
};

export default ComponentWrapper;
