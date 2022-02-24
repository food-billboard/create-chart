import { ReactNode, CSSProperties, useCallback } from 'react';
import { Rnd, Props, RndDragCallback, RndResizeCallback } from 'react-rnd';
import { merge } from 'lodash';
import { isGroupComponent } from '@/utils/Assist/Component';
import { mergeWithoutArray } from '@/utils';
import { AbsorbUtil } from '@/pages/Designer/components/Panel/components/PanelWrapper/components/AbsorbGuideLine/utils';

const ComponentWrapper = (
  props: {
    children?: ReactNode;
    className?: string;
    style?: CSSProperties;
    select?: string[];
    pointerDisabled?: boolean;
    setComponent: (
      callback: (
        value: ComponentData.TComponentData,
      ) => SuperPartial<ComponentData.TComponentData>,
    ) => void;
    componentId: string;
  } & Partial<Props>,
) => {
  const {
    children,
    className,
    style,
    propsOnDragStop,
    propsOnResizeStop,
    select,
    pointerDisabled,
    setComponent,
    componentId,
    size,
    ...nextProps
  } = props;

  const { position } = nextProps;

  const onDragStop: RndDragCallback = useCallback(
    (event, data) => {
      const { x, y } = data;
      const { x: prevX = 0, y: prevY = 0 } = position || {};

      // * 点击不触发刷新
      if (Math.abs(x - prevX) < 5 && Math.abs(y - prevY) < 5) return;

      const left = Math.floor(x);
      const top = Math.floor(y);

      setComponent(() => {
        return {
          config: {
            style: {
              left,
              top,
            },
          },
        };
      });
      propsOnDragStop?.();
      AbsorbUtil.onComponentDragEnd(componentId, {
        ...(size as any),
        left,
        top,
      });
    },
    [propsOnDragStop, setComponent, position, size, componentId],
  );

  const updateSubComponents = (
    component: ComponentData.TComponentData,
    width: number,
    height: number,
  ) => {
    const {} = component;
  };

  const getComponentStyle = useCallback((position: any, size: any) => {
    const newWidth = parseInt(size.style.width) || 20;
    const newHeight = parseInt(size.style.height) || 20;
    return {
      width: newWidth,
      height: newHeight,
      left: Math.floor(position.x),
      top: Math.floor(position.y),
    };
  }, []);

  const onResizeStop: RndResizeCallback = useCallback(
    (e, direction, ref, delta, position) => {
      const { width, height } = delta;
      // * 点击不触发刷新
      if (Math.abs(width) < 5 && Math.abs(height) < 5) return;

      setComponent((value) => {
        const newStyle = getComponentStyle(position, ref);
        const { width: newWidth, height: newHeight } = newStyle;

        const defaultChangeConfig: SuperPartial<ComponentData.TComponentData> =
          {
            config: {
              style: newStyle,
            },
          };

        if (!isGroupComponent(value)) return defaultChangeConfig;

        const {
          config: {
            style: { width, height },
            attr: { scaleX = 1, scaleY = 1 },
          },
        } = value;

        const newScaleX = (newWidth / width) * scaleX;
        const newScaleY = (newHeight / height) * scaleY;

        return mergeWithoutArray({}, defaultChangeConfig, {
          config: {
            attr: {
              scaleX: newScaleX,
              scaleY: newScaleY,
            },
          },
        });
      });
      propsOnResizeStop?.();
    },
    [propsOnResizeStop, getComponentStyle],
  );

  const onDrag: RndDragCallback = useCallback(
    (event, data) => {
      const { x, y } = data;
      const { x: prevX = 0, y: prevY = 0 } = position || {};

      // * 点击不触发刷新
      if (Math.abs(x - prevX) < 5 && Math.abs(y - prevY) < 5) return;

      const left = Math.floor(x);
      const top = Math.floor(y);

      AbsorbUtil.onComponentDrag(componentId, {
        ...(size as any),
        left,
        top,
      });
    },
    [componentId, size, position],
  );

  const onResize: RndResizeCallback = useCallback(
    (e, direction, ref, delta, position) => {
      const { width, height } = delta;
      // * 点击不触发刷新
      if (Math.abs(width) < 5 && Math.abs(height) < 5) return;

      AbsorbUtil.onComponentResizing(
        componentId,
        getComponentStyle(position, ref),
      );
    },
    [componentId],
  );

  return (
    <Rnd
      enableResizing={!pointerDisabled}
      disableDragging={pointerDisabled}
      className={className}
      style={merge({}, style)}
      default={{
        x: 0,
        y: 0,
        width: 320,
        height: 200,
      }}
      onDrag={onDrag}
      onDragStop={onDragStop}
      onResize={onResize}
      onResizeStop={onResizeStop}
      resizeHandleComponent={{}}
      size={size}
      {...nextProps}
    >
      {children}
    </Rnd>
  );
};

export default ComponentWrapper;
