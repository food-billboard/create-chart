import { ReactNode, CSSProperties, useState, useMemo, useRef } from 'react';
import { Rnd, Props, RndDragCallback, RndResizeCallback } from 'react-rnd';
import { merge, omit } from 'lodash';
import {
  MIN_COMPONENT_HEIGHT,
  MIN_COMPONENT_WIDTH,
  SELECTO_CLASSNAME,
} from '@/utils/constants';
import { AbsorbUtil } from '@/pages/Designer/components/Panel/components/PanelWrapper/components/AbsorbGuideLine/utils';
import KeyActionComponent from './KeyActionComponent';

type IProps = {
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
  pointerDisabled?: boolean;
  setComponent: (
    callback: (
      value: ComponentData.TComponentData,
    ) => SuperPartial<ComponentData.TComponentData>,
  ) => void;
  componentId: string;
  isSelect: boolean;
  grid: number;
  flag: ComponentData.ScreenFlagType;
} & Partial<Props>;

const ComponentWrapper = (
  props: IProps & {
    dragMethod: any;
    resizeMethod: any;
  },
) => {
  const {
    isSelect,
    position,
    propsOnDragStop,
    setComponent,
    onDragStop: propsOnDragStopMethod,
    dragMethod,
    onDrag: propsOnDrag,
    propsOnResizeStop,
    onResizeStop: propsOnResizeStopMethod,
    resizeMethod,
    onResize: propsOnResize,
    pointerDisabled,
    className,
    style,
    grid,
    children,
    flag,
  } = props;

  const isResizing = useRef<boolean>(false);
  const [lockAspectRatio, setLockAspectRatio] = useState<boolean>(false);

  const onDragStop: RndDragCallback = (event, data) => {
    // * 未选中不触发事件
    if (!isSelect) return;

    const { x, y } = data;
    const { x: prevX = 0, y: prevY = 0 } = position || {};

    // * 点击不触发刷新
    if (Math.abs(x - prevX) < 5 && Math.abs(y - prevY) < 5) return;
    setComponent(dragMethod.bind(null, event, data, true));

    propsOnDragStop?.();
    propsOnDragStopMethod?.(event, data);
    AbsorbUtil.onComponentDragEnd();
  };

  const onDrag: RndDragCallback = (event, data) => {
    // * 未选中不触发事件
    if (!isSelect) return;

    const { x, y } = data;

    const left = Math.floor(x);
    const top = Math.floor(y);

    // ! 效果不好，到时候优化
    // AbsorbUtil.onComponentDrag(componentId, {
    //   ...(size as any),
    //   left,
    //   top,
    // });

    propsOnDrag?.(event, data);
  };

  const onResizeStop: RndResizeCallback = (
    e,
    direction,
    ref,
    delta,
    position,
  ) => {
    // * 未选中不触发事件
    if (!isSelect) return;

    const { width, height } = delta;
    // * 点击不触发刷新
    if (Math.abs(width) < 5 && Math.abs(height) < 5) return;

    setComponent(
      resizeMethod.bind(null, e, direction, ref, delta, position, true),
    );

    propsOnResizeStopMethod?.(e, direction, ref, delta, position);
    propsOnResizeStop?.();
    isResizing.current = false;
  };

  const onResize: RndResizeCallback = (e, direction, ref, delta, position) => {
    // * 未选中不触发事件
    if (!isSelect) return;

    const { width, height } = delta;
    // * 点击不触发刷新
    if (Math.abs(width) < 5 && Math.abs(height) < 5) return;

    // ! 效果不好，到时候优化
    // AbsorbUtil.onComponentResizing(
    //   componentId,
    //   getComponentStyle(position, ref),
    // );

    propsOnResize?.(e, direction, ref, delta, position);
  };

  const onLockAspectRatioChange = (value: boolean) => {
    if (!isResizing.current) setLockAspectRatio(value);
  };

  const realChildren = useMemo(() => {
    return children;
  }, [children]);

  return (
    <KeyActionComponent onChange={onLockAspectRatioChange}>
      <Rnd
        enableResizing={!pointerDisabled && isSelect}
        disableDragging={flag === 'H5' || pointerDisabled || !isSelect}
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
        onResizeStart={(event, data, direction) => {
          isResizing.current = true;
          props.onResizeStart?.(event, data, direction);
        }}
        resizeHandleClasses={[
          'left',
          'top',
          'right',
          'bottom',
          'topLeft',
          'topRight',
          'bottomLeft',
          'bottomRight',
        ].reduce<any>((acc, cur) => {
          acc[cur] = SELECTO_CLASSNAME;
          return acc;
        }, {})}
        minWidth={MIN_COMPONENT_WIDTH}
        minHeight={MIN_COMPONENT_HEIGHT}
        lockAspectRatio={lockAspectRatio}
        resizeGrid={[grid, grid]}
        dragGrid={[grid, grid]}
        {...omit(props, [
          'children',
          'className',
          'style',
          'propsOnDragStop',
          'propsOnResizeStop',
          'pointerDisabled',
          'setComponent',
          'componentId',
          'isSelect',
          'grid',
          'isResizing',
          'resizeMethod',
          'dragMethod',
          'onDrag',
          'onDragStop',
          'onResizeStop',
          'onResize',
          'flag',
        ])}
      >
        {realChildren}
      </Rnd>
    </KeyActionComponent>
  );
};

export default ComponentWrapper;
