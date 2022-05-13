import { ReactNode, CSSProperties, Component } from 'react';
import { Rnd, Props, RndDragCallback, RndResizeCallback } from 'react-rnd';
import { merge, debounce } from 'lodash';
import ResizeHandleComponent from './ResizeComponent';
import { isGroupComponent } from '@/utils/Assist/Component';
import { mergeWithoutArray } from '@/utils';
import { AbsorbUtil } from '@/pages/Designer/components/Panel/components/PanelWrapper/components/AbsorbGuideLine/utils';

class ComponentWrapper extends Component<
  {
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
    setComponentAll: (
      value:
        | ComponentData.TComponentData[]
        | ((
            value: ComponentData.TComponentData[],
          ) => ComponentData.TComponentData[]),
    ) => void;
    componentId: string;
    isSelect: boolean;
  } & Partial<Props>
> {
  get multiSelect() {
    const { select } = this.props;
    return (select?.length || 0) > 1;
  }

  dragInfo = {
    left: 0,
    top: 0,
    drag: false,
  };

  resizeInfo = {
    left: 0,
    top: 0,
    width: 0,
    height: 0,
    resize: false,
  };

  getComponentStyle = (position: any, size: any) => {
    const newWidth = parseInt(size.style.width) || 20;
    const newHeight = parseInt(size.style.height) || 20;
    return {
      width: newWidth,
      height: newHeight,
      left: Math.floor(position.x),
      top: Math.floor(position.y),
    };
  };

  // 调整大小方法
  resizeMethod: any = (
    e: any,
    direction: any,
    ref: any,
    delta: any,
    position: any,
    isSelf: boolean,
    value: ComponentData.TComponentData,
  ) => {
    const { position: componentPosition } = this.props;
    let newWidth = 0;
    let newHeight = 0;
    let realDeltaX = componentPosition?.x
      ? position.x - componentPosition.x
      : 0;
    let realDeltaY = componentPosition?.y
      ? position.y - componentPosition.y
      : 0;
    let realDeltaWidth = delta.width;
    let realDeltaHeight = delta.height;
    const newStyle = this.getComponentStyle(position, ref);
    let defaultChangeConfig: SuperPartial<ComponentData.TComponentData> = {};

    if (this.resizeInfo.resize) {
      const { x, y } = position;
      const { left, top, width, height } = this.resizeInfo;
      realDeltaX = x - left;
      realDeltaY = y - top;
      realDeltaWidth = newStyle.width - width;
      realDeltaHeight = newStyle.height - height;
    }

    if (isSelf) {
      const { width, height } = newStyle;
      newWidth = width;
      newHeight = height;
      defaultChangeConfig = {
        config: {
          style: newStyle,
        },
      };
    } else {
      const {
        config: {
          style: { width, height, left, top },
        },
      } = value;
      newWidth = width + realDeltaWidth;
      newHeight = height + realDeltaHeight;
      defaultChangeConfig = {
        config: {
          style: {
            width: newWidth,
            height: newHeight,
            left: left + realDeltaX,
            top: top + realDeltaY,
          },
        },
      };
    }

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
  };

  // 拖拽方法
  dragMethod: any = (event: any, data: any, isSelf: boolean, value: any) => {
    const { x, y, deltaX, deltaY } = data;

    const left = Math.floor(x);
    const top = Math.floor(y);

    let realDeltaX = deltaX;
    let realDeltaY = deltaY;

    if (this.dragInfo.drag) {
      realDeltaX = x - this.dragInfo.left;
      realDeltaY = y - this.dragInfo.top;
    }

    if (isSelf) {
      return {
        config: {
          style: {
            left,
            top,
          },
        },
      };
    }

    return {
      config: {
        style: {
          left: value.config.style.left + realDeltaX,
          top: value.config.style.top + realDeltaY,
        },
      },
    };
  };

  // 复合调整大小
  multiOnResize: RndResizeCallback = (e, direction, ref, delta, position) => {
    const { setComponentAll, componentId, select } = this.props;
    const newStyle = this.getComponentStyle(position, ref);
    setComponentAll((components) => {
      return components.map((item) => {
        const { id } = item;
        if (componentId === id || !select?.includes(id)) return item;
        return merge(
          item,
          this.resizeMethod(e, direction, ref, delta, position, false, item),
        );
      });
    });
    this.resizeInfo = {
      resize: true,
      ...newStyle,
    };
  };

  // 复合拖拽
  multiOnDrag: RndDragCallback = (event, data) => {
    const { setComponentAll, componentId, select } = this.props;
    const { x, y } = data;

    setComponentAll((components) => {
      return components.map((item) => {
        const { id } = item;
        if (componentId === id || !select?.includes(id)) return item;
        const result = merge(item, this.dragMethod(event, data, false, item));
        return result;
      });
    });

    this.dragInfo = {
      drag: true,
      left: x,
      top: y,
    };
  };

  debounceMultiOnResize = debounce(this.multiOnResize, 2);
  debounceMultiOnDrag = debounce(this.multiOnDrag, 2);

  onDragStop: RndDragCallback = (event, data) => {
    const { isSelect, position, propsOnDragStop, setComponent } = this.props;
    // * 未选中不触发事件
    if (!isSelect) return;

    const { x, y } = data;
    const { x: prevX = 0, y: prevY = 0 } = position || {};

    // * 点击不触发刷新
    if (Math.abs(x - prevX) < 5 && Math.abs(y - prevY) < 5) return;

    setComponent(this.dragMethod.bind(null, event, data, true));
    propsOnDragStop?.();
    AbsorbUtil.onComponentDragEnd();
    this.dragInfo.drag = false;
  };

  onResizeStop: RndResizeCallback = (e, direction, ref, delta, position) => {
    const { isSelect, setComponent, propsOnResizeStop } = this.props;
    // * 未选中不触发事件
    if (!isSelect) return;

    const { width, height } = delta;
    // * 点击不触发刷新
    if (Math.abs(width) < 5 && Math.abs(height) < 5) return;

    setComponent(
      this.resizeMethod.bind(null, e, direction, ref, delta, position, true),
    );
    propsOnResizeStop?.();
    this.resizeInfo.resize = false;
  };

  onDrag: RndDragCallback = (event, data) => {
    const { isSelect, position, size, componentId } = this.props;
    // * 未选中不触发事件
    if (!isSelect) return;

    const { x, y } = data;
    // const { x: prevX = 0, y: prevY = 0 } = position || {};

    // // * 点击不触发刷新
    // if (Math.abs(x - prevX) < 5 && Math.abs(y - prevY) < 5) return;

    const left = Math.floor(x);
    const top = Math.floor(y);

    AbsorbUtil.onComponentDrag(componentId, {
      ...(size as any),
      left,
      top,
    });

    // * 复合移动
    if (this.multiSelect) {
      this.debounceMultiOnDrag(event, data);
    }
  };

  onResize: RndResizeCallback = (e, direction, ref, delta, position) => {
    const { isSelect, componentId } = this.props;
    // * 未选中不触发事件
    if (!isSelect) return;

    const { width, height } = delta;
    // * 点击不触发刷新
    if (Math.abs(width) < 5 && Math.abs(height) < 5) return;

    AbsorbUtil.onComponentResizing(
      componentId,
      this.getComponentStyle(position, ref),
    );

    // * 复合尺寸修改
    if (this.multiSelect) {
      this.debounceMultiOnResize(e, direction, ref, delta, position);
    }
  };

  render() {
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
      isSelect,
      setComponentAll,
      ...nextProps
    } = this.props;

    return (
      <Rnd
        enableResizing={!pointerDisabled && isSelect}
        disableDragging={pointerDisabled || !isSelect}
        className={className}
        style={merge({}, style)}
        default={{
          x: 0,
          y: 0,
          width: 320,
          height: 200,
        }}
        onDrag={this.onDrag}
        onDragStop={this.onDragStop}
        onResize={this.onResize}
        onResizeStop={this.onResizeStop}
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
          acc[cur] = 'react-select-to-border';
          return acc;
        }, {})}
        size={size}
        {...nextProps}
      >
        {children}
      </Rnd>
    );
  }
}

export default ComponentWrapper;
