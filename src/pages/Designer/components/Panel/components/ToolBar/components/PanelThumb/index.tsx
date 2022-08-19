import { useMemo, useState, useEffect } from 'react';
import { Button } from 'antd';
import { connect } from 'dva';
import classnames from 'classnames';
import { useUpdateEffect } from 'ahooks';
import { MinusSquareOutlined, PlusSquareOutlined } from '@ant-design/icons';
import ColorSelect from '@/components/ColorSelect';
import ThemeUtil from '@/utils/Assist/Theme';
import {
  GLOBAL_EVENT_EMITTER,
  EVENT_NAME_MAP,
} from '@/utils/Assist/EventEmitter';
import { mapStateToProps, mapDispatchToProps } from './connect';
import styles from './index.less';

const { getRgbaString } = ColorSelect;

const THUMB_WIDTH = 240;

type CommonEventType = {
  componentId: string;
  value?: any;
  isMulti: boolean;
};

const ComponentItem = (props: {
  width: number;
  height: number;
  left: number;
  top: number;
  id: string;
  scale: number;
}) => {
  const {
    id,
    scale,
    width: propsWidth,
    height: propsHeight,
    left: propsLeft,
    top: propsTop,
  } = props;

  const [isActive, setIsActive] = useState<boolean>(false);

  const [width, setWidth] = useState<number>(propsWidth || 0);
  const [height, setHeight] = useState<number>(propsHeight || 0);
  const [left, setLeft] = useState<number>(propsLeft || 0);
  const [top, setTop] = useState<number>(propsTop || 0);

  const onDragStart = ({ componentId }: CommonEventType) => {
    if (componentId === id) setIsActive(true);
  };

  const onDrag = ({ componentId, value }: CommonEventType) => {
    if (componentId === id) {
      const { left, top } = value!;
      setLeft(left);
      setTop(top);
    }
  };

  const onDragEnd = ({ componentId }: CommonEventType) => {
    if (componentId === id) setIsActive(false);
  };

  const onResizeStart = ({ componentId }: CommonEventType) => {
    if (componentId === id) setIsActive(true);
  };

  const onResize = ({ componentId, value }: CommonEventType) => {
    if (componentId === id) {
      const { left, top, width, height } = value!;
      setLeft(left);
      setTop(top);
      setWidth(width);
      setHeight(height);
    }
  };

  const onResizeEnd = ({ componentId }: CommonEventType) => {
    if (componentId === id) setIsActive(false);
  };

  useUpdateEffect(() => {
    setWidth(propsWidth);
    setHeight(propsHeight);
    setLeft(propsLeft);
    setTop(propsTop);
  }, [propsWidth, propsHeight, propsLeft, propsTop]);

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

  return (
    <div
      className="pos-ab"
      style={{
        width: width * scale,
        height: height * scale,
        left: left * scale,
        top: top * scale,
        backgroundColor: isActive
          ? getRgbaString(ThemeUtil.generateNextColor4CurrentTheme(0))
          : 'white',
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
    </div>
  );
};

const PanelThumb = connect(
  mapStateToProps,
  mapDispatchToProps,
)(InternalPanelThumb);

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
