import {
  ReactNode,
  CSSProperties,
  useState,
  useMemo,
  useRef,
  useEffect,
  useCallback,
} from 'react';
import { Rnd, Props, RndDragCallback, RndResizeCallback } from 'react-rnd';
import { merge, throttle, get, omit, pick } from 'lodash';
import { useDeepCompareEffect } from 'ahooks';
import {
  MIN_COMPONENT_HEIGHT,
  MIN_COMPONENT_WIDTH,
} from '@/utils/constants/another';
import { isGroupComponent } from '@/utils/Assist/Component';
import { mergeWithoutArray } from '@/utils';
import { getGlobalSelect } from '@/utils/Assist/GlobalDva';
import {
  GLOBAL_EVENT_EMITTER,
  EVENT_NAME_MAP,
} from '@/utils/Assist/EventEmitter';
import { AbsorbUtil } from '@/pages/Designer/components/Panel/components/PanelWrapper/components/AbsorbGuideLine/utils';
import MultiComponentActionUtil, {
  MultiComponentAction,
} from '@/utils/Assist/MultiComponentAction';
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
} & Partial<Props>;

const getComponentStyle = (position: any, size: any) => {
  const newWidth = parseInt(size.style.width) || 20;
  const newHeight = parseInt(size.style.height) || 20;
  return {
    width: newWidth,
    height: newHeight,
    left: position.x,
    top: position.y,
  };
};

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

  return (
    <KeyActionComponent onChange={onLockAspectRatioChange}>
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
          acc[cur] = 'react-select-to-border';
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
        ])}
      >
        {children}
      </Rnd>
    </KeyActionComponent>
  );
};

export default (
  props: IProps & {
    componentScale: {
      scaleX?: number;
      scaleY?: number;
    };
    type: ComponentData.TComponentType;
  },
) => {
  const [statePosition, _setStatePosition] = useState<IProps['position']>(
    props.position,
  );
  const [stateSize, _setStateSize] = useState<IProps['size']>(props.size);
  const [isDealing, setIsDealing] = useState<boolean>(false);

  const isMultiSelect = useRef<boolean>(false);

  const setStatePosition = throttle(_setStatePosition, 100);
  const setStateSize = throttle(_setStateSize, 100);

  const { componentScale, type, ...nextProps } = props;
  const {
    position: propsPosition,
    size: propsSize,
    componentId,
    isSelect,
    setComponent,
  } = nextProps;

  const dragInfo = useRef({
    left: statePosition?.x || 0,
    top: statePosition?.y || 0,
    drag: false,
    position: {
      ...statePosition,
    },
  });

  const resizeInfo = useRef({
    left: statePosition?.x || 0,
    top: statePosition?.y || 0,
    width: stateSize?.width || 0,
    height: stateSize?.height || 0,
    resize: false,
    position: {
      ...statePosition,
    },
    size: {
      ...stateSize,
    },
    scale: {
      ...componentScale,
    },
  });

  const getIsMultiSelect = useCallback(() => {
    isMultiSelect.current = (getGlobalSelect()?.length || 0) > 1;
  }, []);

  const position = useMemo(() => {
    if (isDealing) {
      return statePosition;
    }
    return propsPosition;
  }, [propsPosition, statePosition, isDealing]);

  const size = useMemo(() => {
    if (isDealing) return stateSize;
    return propsSize;
  }, [propsSize, stateSize, isDealing]);

  // 调整大小方法
  const resizeMethod: any = (
    e: any,
    direction: any,
    ref: any,
    delta: any,
    position: any,
    isSelf: boolean,
    value: ComponentData.TComponentData,
    outerResizeInfo: any,
  ) => {
    const resizePositionX = (outerResizeInfo || resizeInfo.current).left;
    const resizePositionY = (outerResizeInfo || resizeInfo.current).top;

    let newWidth = 0;
    let newHeight = 0;
    let realDeltaX =
      typeof resizePositionX === 'number' ? position.x - resizePositionX : 0;
    let realDeltaY =
      typeof resizePositionY === 'number' ? position.y - resizePositionY : 0;

    const newStyle = getComponentStyle(position, ref);
    let defaultChangeConfig: SuperPartial<ComponentData.TComponentData> = {};

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
      let realDeltaWidth = outerResizeInfo
        ? newStyle.width - outerResizeInfo.width
        : 0;
      let realDeltaHeight = outerResizeInfo
        ? newStyle.height - outerResizeInfo.height
        : 0;

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
  const dragMethod: any = (
    event: any,
    data: any,
    isSelf: boolean,
    value: any,
    outerDragInfo: any,
  ) => {
    const { x, y, deltaX, deltaY } = data;

    const left = x;
    const top = y;

    let realDeltaX = deltaX;
    let realDeltaY = deltaY;

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
  const multiOnResize: RndResizeCallback = (
    e,
    direction,
    ref,
    delta,
    position,
  ) => {
    const newStyle = getComponentStyle(position, ref);

    GLOBAL_EVENT_EMITTER.emitThrottle(EVENT_NAME_MAP.COMPONENT_RESIZE, {
      isMulti: false,
      componentId,
      value: {
        ...newStyle,
      },
    });

    resizeInfo.current.resize = true;

    MultiComponentActionUtil.emit(
      MultiComponentAction.RESIZE,
      componentId,
      e,
      direction,
      ref,
      delta,
      position,
      resizeInfo.current,
    );

    resizeInfo.current = {
      ...resizeInfo.current,
      ...newStyle,
    };
  };

  // 复合拖拽
  const multiOnDrag: RndDragCallback = (event, data) => {
    const { x, y } = data;

    dragInfo.current.drag = true;

    MultiComponentActionUtil.emit(
      MultiComponentAction.DRAG,
      componentId,
      event,
      data,
      dragInfo.current,
    );

    dragInfo.current = {
      ...dragInfo.current,
      left: x,
      top: y,
    };
  };

  const onRelationDragStart = (targetId: string) => {
    if (!isSelect || componentId === targetId) return;
    setIsDealing(true);
    GLOBAL_EVENT_EMITTER.emitThrottle(EVENT_NAME_MAP.COMPONENT_DRAG_START, {
      componentId,
      isMulti: true,
    });
  };

  const onRelationDrag = (
    targetId: string,
    event: any,
    data: any,
    outerDragInfo: any,
  ) => {
    if (!isSelect || componentId === targetId) return;
    const nextPosition = dragMethod(
      event,
      data,
      false,
      {
        config: {
          style: {
            left: dragInfo.current.position?.x || 0,
            top: dragInfo.current.position?.y || 0,
          },
        },
      },
      outerDragInfo,
    );
    const nextState = {
      x: get(nextPosition, 'config.style.left') || 0,
      y: get(nextPosition, 'config.style.top') || 0,
    };
    GLOBAL_EVENT_EMITTER.emit(EVENT_NAME_MAP.COMPONENT_DRAG, {
      componentId,
      isMulti: true,
      value: {
        left: nextState.x,
        top: nextState.y,
      },
    });
    dragInfo.current.position = {
      ...nextState,
    };

    setStatePosition((prev) => ({ ...nextState }));
  };

  const onRelationDragStop = (targetId: string) => {
    if (!isSelect || componentId === targetId) return;
    setIsDealing(false);
    const { x, y } = dragInfo.current.position;
    setComponent(() => {
      return {
        config: {
          style: {
            left: x || 0,
            top: y || 0,
          },
        },
      };
    });

    GLOBAL_EVENT_EMITTER.emit(EVENT_NAME_MAP.COMPONENT_DRAG_END, {
      componentId,
      isMulti: true,
      value: {
        left: x || 0,
        top: y || 0,
      },
    });
  };

  const onRelationResizeStart = (targetId: string) => {
    if (!isSelect || componentId === targetId) return;
    setIsDealing(true);
    GLOBAL_EVENT_EMITTER.emit(EVENT_NAME_MAP.COMPONENT_RESIZE_START, {
      componentId,
      isMulti: true,
    });
  };

  const onRelationResize = (
    targetId: string,
    e: any,
    direction: any,
    ref: any,
    delta: any,
    position: any,
    outerResizeInfo: any,
  ) => {
    if (!isSelect || componentId === targetId) return;

    const { position: resizePosition, size, scale = {} } = resizeInfo.current;
    const nextConfig = resizeMethod(
      e,
      direction,
      ref,
      delta,
      position,
      false,
      {
        config: {
          style: {
            left: resizePosition.x || 0,
            top: resizePosition.y || 0,
            width: size.width || 0,
            height: size.height || 0,
          },
          attr: {
            ...scale,
          },
        },
        type,
      },
      outerResizeInfo,
    );

    const {
      config: {
        style: { left, top, width, height },
        attr,
      },
    } = nextConfig;
    resizeInfo.current = {
      ...resizeInfo.current,
      position: {
        x: left,
        y: top,
      },
      size: {
        width,
        height,
      },
      scale: {
        scaleX: attr?.scaleX,
        scaleY: attr?.scaleY,
      },
    };

    setStatePosition((prev) => ({
      ...(resizeInfo.current.position as any),
    }));
    setStateSize((prev) => ({
      ...(resizeInfo.current.size as any),
    }));

    GLOBAL_EVENT_EMITTER.emit(EVENT_NAME_MAP.COMPONENT_RESIZE, {
      componentId,
      isMulti: true,
      value: {
        left,
        top,
        width,
        height,
      },
    });
  };

  const onRelationResizeStop = (targetId: string) => {
    if (!isSelect || componentId === targetId) return;
    setIsDealing(false);
    const { x, y } = resizeInfo.current.position;
    const { width, height } = resizeInfo.current.size;
    const { scaleX, scaleY } = resizeInfo.current.scale;
    setComponent(() => {
      return {
        config: {
          style: {
            left: x || 0,
            top: y || 0,
            width: (width as number) || MIN_COMPONENT_WIDTH,
            height: (height as number) || MIN_COMPONENT_HEIGHT,
          },
          attr: {
            scaleX,
            scaleY,
          },
        },
      };
    });
    GLOBAL_EVENT_EMITTER.emit(EVENT_NAME_MAP.COMPONENT_RESIZE_END, {
      componentId,
      isMulti: true,
      value: {
        left: x,
        top: y,
        width,
        height,
      },
    });
  };

  useDeepCompareEffect(() => {
    setStatePosition(propsPosition);
    resizeInfo.current = {
      ...resizeInfo.current,
      position: {
        ...propsPosition,
      },
      left: propsPosition?.x ?? resizeInfo.current.left,
      top: propsPosition?.y ?? resizeInfo.current.top,
    };
    dragInfo.current = {
      ...dragInfo.current,
      position: {
        ...propsPosition,
      },
      left: propsPosition?.x ?? dragInfo.current.left,
      top: propsPosition?.y ?? dragInfo.current.top,
    };
  }, [propsPosition]);

  useDeepCompareEffect(() => {
    setStateSize(propsSize);
    resizeInfo.current = {
      ...resizeInfo.current,
      size: {
        ...propsSize,
      },
      width: propsSize?.width ?? resizeInfo.current.width,
      height: propsSize?.height ?? resizeInfo.current.height,
    };
  }, [propsSize]);

  useDeepCompareEffect(() => {
    resizeInfo.current = {
      ...resizeInfo.current,
      scale: {
        ...componentScale,
      },
    };
  }, [componentScale]);

  useEffect(() => {
    if (isSelect) {
      MultiComponentActionUtil.addListener(
        MultiComponentAction.DRAG_START,
        onRelationDragStart,
      );
      MultiComponentActionUtil.addListener(
        MultiComponentAction.DRAG,
        onRelationDrag,
      );
      MultiComponentActionUtil.addListener(
        MultiComponentAction.DRAG_STOP,
        onRelationDragStop,
      );
      MultiComponentActionUtil.addListener(
        MultiComponentAction.RESIZE_START,
        onRelationResizeStart,
      );
      MultiComponentActionUtil.addListener(
        MultiComponentAction.RESIZE,
        onRelationResize,
      );
      MultiComponentActionUtil.addListener(
        MultiComponentAction.RESIZE_STOP,
        onRelationResizeStop,
      );
    }
    return () => {
      MultiComponentActionUtil.removeListener(
        MultiComponentAction.DRAG_START,
        onRelationDragStart,
      );
      MultiComponentActionUtil.removeListener(
        MultiComponentAction.DRAG,
        onRelationDrag,
      );
      MultiComponentActionUtil.removeListener(
        MultiComponentAction.DRAG_STOP,
        onRelationDragStop,
      );
      MultiComponentActionUtil.removeListener(
        MultiComponentAction.RESIZE_START,
        onRelationResizeStart,
      );
      MultiComponentActionUtil.removeListener(
        MultiComponentAction.RESIZE,
        onRelationResize,
      );
      MultiComponentActionUtil.removeListener(
        MultiComponentAction.RESIZE_STOP,
        onRelationResizeStop,
      );
    };
  }, [isSelect]);

  return (
    <ComponentWrapper
      {...nextProps}
      resizeMethod={resizeMethod}
      dragMethod={dragMethod}
      onResizeStart={() => {
        getIsMultiSelect();
        MultiComponentActionUtil.emit(
          MultiComponentAction.RESIZE_START,
          componentId,
        );
        GLOBAL_EVENT_EMITTER.emit(EVENT_NAME_MAP.COMPONENT_RESIZE_START, {
          isMulti: false,
          componentId,
        });
        resizeInfo.current.resize = true;
      }}
      onResizeStop={(...args) => {
        MultiComponentActionUtil.emit(
          MultiComponentAction.RESIZE_STOP,
          componentId,
        );
        props.onResizeStop?.(...args);
        resizeInfo.current.resize = false;
        GLOBAL_EVENT_EMITTER.emit(EVENT_NAME_MAP.COMPONENT_RESIZE_END, {
          isMulti: false,
          componentId,
        });
      }}
      onResize={(e, direction, ref, delta, position) => {
        // * 复合尺寸修改
        if (isMultiSelect.current) {
          multiOnResize(e, direction, ref, delta, position);
        } else {
          const newStyle = getComponentStyle(position, ref);

          GLOBAL_EVENT_EMITTER.emitThrottle(EVENT_NAME_MAP.COMPONENT_RESIZE, {
            isMulti: false,
            componentId,
            value: {
              ...newStyle,
            },
          });
        }
      }}
      onDragStart={() => {
        getIsMultiSelect();
        MultiComponentActionUtil.emit(
          MultiComponentAction.DRAG_START,
          componentId,
        );
        dragInfo.current.drag = true;
        GLOBAL_EVENT_EMITTER.emit(EVENT_NAME_MAP.COMPONENT_DRAG_START, {
          isMulti: false,
          componentId,
        });
      }}
      onDragStop={(...args) => {
        MultiComponentActionUtil.emit(
          MultiComponentAction.DRAG_STOP,
          componentId,
        );
        props.onDragStop?.(...args);
        dragInfo.current.drag = false;
        GLOBAL_EVENT_EMITTER.emit(EVENT_NAME_MAP.COMPONENT_DRAG_END, {
          isMulti: false,
          componentId,
        });
      }}
      onDrag={(event, data) => {
        // * 复合移动
        if (isMultiSelect.current) {
          multiOnDrag(event, data);
        }
        const { x, y } = data;
        GLOBAL_EVENT_EMITTER.emitThrottle(EVENT_NAME_MAP.COMPONENT_DRAG, {
          isMulti: false,
          componentId,
          value: {
            left: x,
            top: y,
          },
        });
      }}
      position={position}
      size={size}
    />
  );
};
