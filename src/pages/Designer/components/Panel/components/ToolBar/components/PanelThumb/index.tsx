import { MinusSquareOutlined, PlusSquareOutlined } from '@ant-design/icons';
import { useUpdateEffect } from 'ahooks';
import { Button, Tooltip as AntTooltip, ConfigProvider } from 'antd';
import type { TooltipProps } from 'antd';
import classnames from 'classnames';
import EventEmitter from 'eventemitter3';
import { pick } from 'lodash';
import { ReactNode, useEffect, useMemo, useRef, useState } from 'react';
import { connect } from 'umi';
import { ScreenTooltip } from '@/components/Tooltip';
import { useIdPathMap } from '@/hooks';
import { ConnectState } from '@/models/connect';
import { getTopParentComponent } from '@/utils/Assist/Component';
import {
  EVENT_NAME_MAP,
  GLOBAL_EVENT_EMITTER,
} from '@/utils/Assist/EventEmitter';
import { mapDispatchToProps, mapStateToProps } from './connect';
import styles from './index.less';

const THUMB_WIDTH = 240;

type CommonEventType = {
  componentId: string;
  value?: any;
  isMulti: boolean;
};

const TransformOriginMap = {
  top: 'center bottom',
  right: 'left center',
  bottom: 'center top',
  left: 'right center',
  topRight: 'left bottom',
  bottomRight: 'left top',
  bottomLeft: 'right top',
  topLeft: 'right bottom',
};

type TDirection = keyof typeof TransformOriginMap;

const InternalComponentActiveItem = (props: {
  components: ComponentData.TComponentData[];
  select: string[];
  width: number;
  height: number;
  scale: number;
}) => {
  const {
    components,
    select,
    width: propsWidth,
    height: propsHeight,
    scale,
  } = props;

  const [isActive, setIsActive] = useState<boolean>(false);

  // const [width, setWidth] = useState<number>(propsWidth || 0);
  // const [height, setHeight] = useState<number>(propsHeight || 0);
  const [left, setLeft] = useState<number>(0);
  const [top, setTop] = useState<number>(0);
  const [widthScale, setWidthScale] = useState<number>(1);
  const [heightScale, setHeightScale] = useState<number>(1);

  const activeComponentRef = useRef<{
    left: number;
    top: number;
    width: number;
    height: number;
  }>();

  const resizeDirectionRef = useRef<TDirection>();

  const actionType = useRef<'resize' | 'drag'>('drag');

  const init = () => {
    // setWidth(propsWidth);
    // setHeight(propsHeight);
    setWidthScale(1);
    setHeightScale(1);
    setLeft(0);
    setTop(0);
  };

  const componentList = useMemo(() => {
    if (!isActive) return null;
    const idPathMap = useIdPathMap();
    return select.reduce<any>((acc, cur) => {
      const path = idPathMap[cur]?.path;
      if (!path) return acc;
      // ? 同样需要高亮显示目标元素的顶级父元素
      const component = getTopParentComponent(cur);
      // const component = get(components, path);
      if (component) {
        const {
          width: componentWidth,
          height: componentHeight,
          left,
          top,
        } = component.config.style;
        acc.push(
          <div
            className={classnames(
              'pos-ab',
              styles['designer-panel-thumb-active-item'],
            )}
            style={{
              width: componentWidth * scale,
              height: componentHeight * scale,
              left: left * scale,
              top: top * scale,
            }}
            key={component.id}
          ></div>,
        );
      }
      return acc;
    }, []);
  }, [isActive, select, scale, components]);

  const onDragStart = ({ componentId }: CommonEventType) => {
    actionType.current = 'drag';
    init();
    setIsActive(true);
    // const components: ComponentData.TComponentData[] =
    //   getDvaGlobalModelData().components || [];

    // ? 可能选中的是组内组元素，但是缩略图中只需要显示最上层的元素即可
    const targetTopComponent = getTopParentComponent(componentId);
    // const component = components.find((item) => item.id === componentId);
    activeComponentRef.current = pick(targetTopComponent?.config.style, [
      'left',
      'top',
      'width',
      'height',
    ]) as any;
  };

  const onDrag = ({ value }: CommonEventType) => {
    const { left: currentLeft, top: currentTop } = value!;
    const { left: componentLeft, top: componentTop } =
      activeComponentRef.current!;
    setLeft((currentLeft - componentLeft) * scale);
    setTop((currentTop - componentTop) * scale);
  };

  const onDragEnd = ({ componentId }: CommonEventType) => {
    setIsActive(false);
  };

  const onResizeStart = (
    props: CommonEventType & {
      direction: TDirection;
    },
  ) => {
    resizeDirectionRef.current = props.direction;
    onDragStart(props);
    actionType.current = 'resize';
  };

  const onResize = ({ componentId, value }: CommonEventType) => {
    const {
      left: currentLeft,
      top: currentTop,
      width: currentWidth,
      height: currentHeight,
    } = value!;
    const {
      left: componentLeft,
      top: componentTop,
      width: componentWidth,
      height: componentHeight,
    } = activeComponentRef.current!;
    setLeft((currentLeft - componentLeft) * scale);
    setTop((currentTop - componentTop) * scale);
    // setWidth((currentWidth - componentWidth) * scale + propsWidth);
    // setHeight((currentHeight - componentHeight) * scale + propsHeight);
    setWidthScale(currentWidth / componentWidth);
    setHeightScale(currentHeight / componentHeight);
  };

  const onResizeEnd = ({ componentId }: CommonEventType) => {
    setIsActive(false);
  };

  useEffect(() => {
    GLOBAL_EVENT_EMITTER.addListener(
      EVENT_NAME_MAP.COMPONENT_DRAG_START,
      onDragStart,
    );
    GLOBAL_EVENT_EMITTER.addListener(EVENT_NAME_MAP.COMPONENT_DRAG, onDrag);
    GLOBAL_EVENT_EMITTER.addListener(
      EVENT_NAME_MAP.COMPONENT_DRAG_END,
      onDragEnd,
    );
    GLOBAL_EVENT_EMITTER.addListener(
      EVENT_NAME_MAP.COMPONENT_RESIZE_START,
      onResizeStart,
    );
    GLOBAL_EVENT_EMITTER.addListener(EVENT_NAME_MAP.COMPONENT_RESIZE, onResize);
    GLOBAL_EVENT_EMITTER.addListener(
      EVENT_NAME_MAP.COMPONENT_RESIZE_END,
      onResizeEnd,
    );
    return () => {
      GLOBAL_EVENT_EMITTER.removeListener(
        EVENT_NAME_MAP.COMPONENT_DRAG_START,
        onDragStart,
      );
      GLOBAL_EVENT_EMITTER.removeListener(
        EVENT_NAME_MAP.COMPONENT_DRAG,
        onDrag,
      );
      GLOBAL_EVENT_EMITTER.removeListener(
        EVENT_NAME_MAP.COMPONENT_DRAG_END,
        onDragEnd,
      );
      GLOBAL_EVENT_EMITTER.removeListener(
        EVENT_NAME_MAP.COMPONENT_RESIZE_START,
        onResizeStart,
      );
      GLOBAL_EVENT_EMITTER.removeListener(
        EVENT_NAME_MAP.COMPONENT_RESIZE,
        onResize,
      );
      GLOBAL_EVENT_EMITTER.removeListener(
        EVENT_NAME_MAP.COMPONENT_RESIZE_END,
        onResizeEnd,
      );
    };
  }, []);

  // useUpdateEffect(() => {
  //   setWidth(propsWidth);
  //   setHeight(propsHeight);
  // }, [propsWidth, propsHeight]);

  return (
    <div
      className={styles['designer-panel-thumb-active']}
      style={{
        width: propsWidth,
        height: propsHeight,
        left: actionType.current === 'drag' ? left : 0,
        top: actionType.current === 'drag' ? top : 0,
        // @ts-ignore
        // '--panel-thumb-component-scale': `scale(${width / propsWidth}, ${
        //   height / propsHeight
        // })`,
        '--panel-thumb-component-scale': `scale(${widthScale}, ${heightScale})`,
        '--panel-thumb-component-transform-origin':
          TransformOriginMap[resizeDirectionRef.current!] || 'center center',
      }}
    >
      {componentList}
    </div>
  );
};

const ComponentActiveItem = connect(
  (state: ConnectState) => {
    return {
      components: state.global.components,
      select: state.global.select,
    };
  },
  () => ({}),
)(InternalComponentActiveItem);

const ComponentItem = (props: {
  width: number;
  height: number;
  left: number;
  top: number;
  id: string;
  scale: number;
}) => {
  const { id, scale, width, height, left, top } = props;

  return (
    <div
      className="pos-ab"
      style={{
        width: width * scale,
        height: height * scale,
        left: left * scale,
        top: top * scale,
        backgroundColor: 'white',
      }}
    ></div>
  );
};

const InternalPanelThumb = (props: {
  width: number;
  height: number;
  components: ComponentData.TComponentData[];
}) => {
  const { width, height, components } = props;

  const thumbHeight = useMemo(() => {
    return (height / width) * THUMB_WIDTH;
  }, [width, height]);

  const scale = useMemo(() => {
    return THUMB_WIDTH / width;
  }, [width]);

  const componentList = useMemo(() => {
    return components.map((item) => {
      const {
        id,
        config: {
          style: { width, height, left, top },
        },
      } = item;
      return (
        <ComponentItem
          width={width}
          height={height}
          left={left}
          top={top}
          scale={scale}
          id={id}
          key={id}
        />
      );
    });
  }, [components, scale]);

  return (
    <div
      className={classnames(styles['designer-panel-thumb'], 'pos-re')}
      style={{
        width: THUMB_WIDTH,
        height: thumbHeight,
      }}
    >
      {componentList}
      <ComponentActiveItem
        width={THUMB_WIDTH}
        height={thumbHeight}
        scale={scale}
      />
    </div>
  );
};

const PanelThumb = connect(
  mapStateToProps,
  mapDispatchToProps,
)(InternalPanelThumb);

const EventEmitterInstance = new EventEmitter();

export const Tooltip = (
  props: {
    visible: boolean;
    children?: ReactNode;
    onHide?: () => void;
    uniqueKey: string;
  } & Partial<TooltipProps>,
) => {
  const { visible, children, uniqueKey, onHide, ...nextProps } = props;

  useUpdateEffect(() => {
    EventEmitterInstance.emit('change', uniqueKey, visible);
  }, [visible]);

  useEffect(() => {
    const onChange = (visibleKey: string, visible: boolean) => {
      if (visibleKey !== uniqueKey && visible) {
        onHide?.();
      }
    };
    EventEmitterInstance.addListener('change', onChange);
    return () => {
      EventEmitterInstance.removeListener('change', onChange);
    };
  }, []);

  return (
    <ConfigProvider
      theme={{
        components: {
          Tooltip: {
            zIndexPopupBase: 900,
          },
        },
      }}
    >
      <AntTooltip
        {...nextProps}
        title={children}
        open={visible}
        overlayInnerStyle={{
          padding: 0,
          borderRadius: 4,
          overflow: 'hidden',
          ...nextProps.overlayInnerStyle,
        }}
      />
    </ConfigProvider>
  );
};

const ThumbButton = () => {
  const [visible, setVisible] = useState<boolean>(true);

  const icon = useMemo(() => {
    return visible ? <MinusSquareOutlined /> : <PlusSquareOutlined />;
  }, [visible]);

  return (
    <div
      className={classnames(styles['component-panel-thumb-wrapper'], 'pos-re')}
    >
      <Tooltip
        visible={visible}
        uniqueKey="thumb"
        onHide={setVisible.bind(null, false)}
      >
        <PanelThumb />
      </Tooltip>
      <ScreenTooltip title="缩略图">
        <Button
          type="link"
          icon={icon}
          onClick={setVisible.bind(null, !visible)}
        ></Button>
      </ScreenTooltip>
    </div>
  );
};

export default ThumbButton;
