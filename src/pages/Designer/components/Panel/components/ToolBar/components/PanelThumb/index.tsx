import { useMemo, useState, useEffect, useRef } from 'react';
import { Button } from 'antd';
import classnames from 'classnames';
import { pick } from 'lodash';
import { MinusSquareOutlined, PlusSquareOutlined } from '@ant-design/icons';
import { useIdPathMap, useMobxContext } from '@/hooks';
import ColorSelect from '@/components/ColorSelect';
import ThemeUtil from '@/utils/Assist/Theme';
import { getTopParentComponent } from '@/utils/Assist/Component';
import {
  GLOBAL_EVENT_EMITTER,
  EVENT_NAME_MAP,
} from '@/utils/Assist/EventEmitter';
import styles from './index.less';

const { getRgbaString } = ColorSelect;

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

const ComponentActiveItem = (props: {
  width: number;
  height: number;
  scale: number;
}) => {
  const { width: propsWidth, height: propsHeight, scale } = props;

  const {
    global: { components, select },
  } = useMobxContext();

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
              backgroundColor: getRgbaString(
                ThemeUtil.generateNextColor4CurrentTheme(0),
              ),
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

const PanelThumb = () => {
  const {
    global: {
      components,
      screenData: {
        config: {
          style: { width, height },
        },
      },
    },
  } = useMobxContext();

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

const ThumbButton = () => {
  const [visible, setVisible] = useState<boolean>(true);

  const icon = useMemo(() => {
    return visible ? <MinusSquareOutlined /> : <PlusSquareOutlined />;
  }, [visible]);

  return (
    <div
      className={classnames(styles['component-panel-thumb-wrapper'], 'pos-re')}
    >
      <div className={styles['component-panel-thumb-tooltip']}>
        <div
          style={{
            transform: `scale(${visible ? 1 : 0})`,
          }}
        >
          <PanelThumb />
        </div>
      </div>
      <Button
        type="link"
        icon={icon}
        onClick={setVisible.bind(null, !visible)}
      ></Button>
    </div>
  );
};

export default ThumbButton;
