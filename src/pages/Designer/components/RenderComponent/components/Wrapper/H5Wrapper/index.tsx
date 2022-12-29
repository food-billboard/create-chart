import { ReactNode, CSSProperties, useMemo, useRef } from 'react';
import { Resizable, ResizeCallback, ResizableProps } from 're-resizable';
import { Props } from 'react-rnd';
import { omit } from 'lodash';
import {
  MIN_COMPONENT_HEIGHT,
  MIN_COMPONENT_WIDTH,
  SELECTO_CLASSNAME,
} from '@/utils/constants';

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
  grid?: [number, number];
  flag: ComponentData.ScreenFlagType;
} & Partial<
  Omit<ResizableProps, 'grid' | 'onResizeStart' | 'onResize' | 'onResizeStop'>
> &
  Pick<Props, 'onResizeStart' | 'onResize' | 'onResizeStop'>;

const ComponentWrapper = (
  props: IProps & {
    resizeMethod: any;
  },
) => {
  const {
    isSelect,
    setComponent,
    onResizeStop: propsOnResizeStopMethod,
    resizeMethod,
    onResize: propsOnResize,
    pointerDisabled,
    className,
    style,
    grid,
    children,
  } = props;

  const isResizing = useRef<boolean>(false);

  const onResizeStop: ResizeCallback = (e, direction, ref, delta) => {
    // * 未选中不触发事件
    if (!isSelect) return;

    const { width, height } = delta;
    // * 点击不触发刷新
    if (Math.abs(width) < 5 && Math.abs(height) < 5) return;

    setComponent(
      resizeMethod.bind(null, e, direction, ref, delta, { x: 0, y: 0 }, true),
    );

    propsOnResizeStopMethod?.(e, direction, ref, delta, { x: 0, y: 0 });
    isResizing.current = false;
  };

  const onResize: ResizeCallback = (e, direction, ref, delta) => {
    // * 未选中不触发事件
    if (!isSelect) return;

    const { width, height } = delta;
    // * 点击不触发刷新
    if (Math.abs(width) < 5 && Math.abs(height) < 5) return;

    propsOnResize?.(e, direction, ref, delta, { x: 0, y: 0 });
  };

  const realChildren = useMemo(() => {
    return children;
  }, [children]);

  return (
    <Resizable
      enable={[
        'top',
        'right',
        'left',
        'bottom',
        'topRight',
        'topLeft',
        'bottomRight',
        'bottomLeft',
      ].reduce<any>((acc, cur) => {
        acc[cur] = !pointerDisabled && isSelect;
        return acc;
      }, {})}
      className={className}
      style={style}
      defaultSize={{
        width: 375,
        height: 200,
      }}
      maxWidth={375}
      onResize={onResize as any}
      onResizeStop={onResizeStop as any}
      onResizeStart={(event, data, direction) => {
        isResizing.current = true;
        props.onResizeStart?.(event, data, direction);
      }}
      handleClasses={[
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
      grid={grid}
      {...omit(props, [
        'children',
        'className',
        'style',
        'propsOnResizeStop',
        'pointerDisabled',
        'setComponent',
        'componentId',
        'isSelect',
        'grid',
        'isResizing',
        'resizeMethod',
        'onResizeStop',
        'onResize',
        'flag',
        'position',
      ])}
    >
      {realChildren}
    </Resizable>
  );
};

export default ComponentWrapper;
