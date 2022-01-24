import classnames from 'classnames';
import { useEffect, useCallback, useRef, useMemo, CSSProperties } from 'react';
import {
  ConnectDropTarget,
  DropTargetMonitor,
  DropTarget,
  DropTargetConnector,
} from 'react-dnd';
import { connect } from 'dva';
import { merge } from 'lodash';
import { useBackground } from '@/hooks';
import { createComponent } from '@/utils/Assist/Component';
import ComponentList from '../ComponentList';
import { DRAG_TYPE } from '../../../LeftContent/components/ComponentList/item';
import { mapDispatchToProps, mapStateToProps } from './connect';
import styles from './index.less';

export const DROP_TYPE = 'PAINTER_DROP_TYPE';

export type PainterProps = {
  canDrop: boolean;
  isOver: boolean;
  connectDropTarget: ConnectDropTarget;
  didDrop: boolean;
  dragInfo?: ComponentData.BaseComponentItem | null;
  setDragInfo?: (value: ComponentData.BaseComponentItem | null) => void;
  setSelect: (value: string[]) => void;
  scale: number;
  config: ComponentData.TScreenData['config'];
  setComponent: ComponentMethod.SetComponentMethod;
};

export const PANEL_ID = 'panel-id';

const Painter = (props: PainterProps) => {
  const {
    dragInfo,
    connectDropTarget,
    setDragInfo,
    didDrop,
    setSelect,
    scale: originScale,
    config: { style: { width, height } = {}, attr: { poster } = {} } = {},
    setComponent,
  } = props;

  const clickFlag = useRef<boolean>(false);
  const clickPos = useRef<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  const moveCounter = useRef<number>(0);

  const backgroundStyle = useBackground(poster);

  const scale = useMemo(() => {
    return originScale / 100;
  }, [originScale]);

  const panelStyle: CSSProperties = useMemo(() => {
    return merge(
      {},
      {
        transformOrigin: 'left top',
        transform: `scale(${scale})`,
        width: width || 1920,
        height: height || 1080,
      },
      backgroundStyle,
    );
  }, [scale, backgroundStyle]);

  const onMouseMove = () => {
    moveCounter.current++;
  };

  const onMouseUp = (e: any) => {
    const { clientX, clientY } = e;
    const { x, y } = clickPos.current;
    if (
      clickFlag.current &&
      moveCounter.current < 5 &&
      Math.abs(clientX - x) < 10 &&
      Math.abs(clientY - y) < 10
    ) {
      setSelect([]);
    }
    moveCounter.current = 0;
    clickFlag.current = false;
    clickPos.current = { x: 0, y: 0 };
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  };

  const onMouseDown = useCallback((e: any) => {
    if (e.target.id !== PANEL_ID) return;
    clickFlag.current = true;
    clickPos.current = {
      x: e.clientX,
      y: e.clientY,
    };
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  }, []);

  const generateNewComponent = (value: ComponentData.BaseComponentItem) => {
    const component = createComponent({
      name: value.title,
      description: value.description,
      componentType: value.type,
    });

    setComponent({
      action: 'add',
      id: component.id,
      value: component,
      path: '',
    });

    setSelect([component.id]);

    console.log('generate new item', component);

    setDragInfo?.(null);
  };

  const preventDefaultContextMenu = (e: any) => {
    e.preventDefault();
    return false;
  };

  useEffect(() => {
    if (didDrop && dragInfo) generateNewComponent(dragInfo);
  }, [didDrop, dragInfo]);

  return (
    <div
      id={PANEL_ID}
      className={classnames(styles['page-design-main-panel'], 'pos-re')}
      style={panelStyle}
      ref={connectDropTarget}
      role={DROP_TYPE}
      onMouseDown={onMouseDown}
      onContextMenu={preventDefaultContextMenu}
    >
      <ComponentList />
    </div>
  );
};

const dropTarget = DropTarget(
  DRAG_TYPE,
  {
    drop: (props, monitor, component) => {
      // const { x, y } = monitor.getSourceClientOffset() as {
      //   x: number
      //   y: number
      // }
      // console.log(
      //   monitor.getInitialClientOffset(),
      //   monitor.getInitialSourceClientOffset(),
      //   monitor.getClientOffset(),
      //   monitor.getDifferenceFromInitialOffset(),
      //   monitor.getSourceClientOffset()
      // )

      return {
        name: DROP_TYPE,
        position: {},
      };
    },
  },
  (connect: DropTargetConnector, monitor: DropTargetMonitor) => {
    monitor.didDrop();
    return {
      connectDropTarget: connect.dropTarget(),
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
      didDrop: monitor.didDrop(),
    };
  },
)(Painter);

export default connect(mapStateToProps, mapDispatchToProps)(dropTarget);
