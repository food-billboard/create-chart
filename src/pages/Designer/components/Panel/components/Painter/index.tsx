import classnames from 'classnames';
import { useEffect, useCallback, useRef } from 'react';
import {
  ConnectDropTarget,
  DropTargetMonitor,
  DropTarget,
  DropTargetConnector,
} from 'react-dnd';
import { connect } from 'dva';
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
  setSelect?: (value: string[]) => void;
};

const Painter = (props: PainterProps) => {
  const { dragInfo, connectDropTarget, setDragInfo, didDrop, setSelect } =
    props;

  const clickFlag = useRef<boolean>(false);
  const clickPos = useRef<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  const moveCounter = useRef<number>(0);

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
      setSelect?.([]);
    }
    moveCounter.current = 0;
    clickFlag.current = false;
    clickPos.current = { x: 0, y: 0 };
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  };

  const onMouseDown = useCallback((e: any) => {
    clickFlag.current = true;
    clickPos.current = {
      x: e.clientX,
      y: e.clientY,
    };
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  }, []);

  const generateNewComponent = (value: ComponentData.BaseComponentItem) => {
    console.log('generate new item', value);
    setDragInfo?.(null);
  };

  useEffect(() => {
    if (didDrop && dragInfo) generateNewComponent(dragInfo);
  }, [didDrop, dragInfo]);

  return (
    <div
      className={classnames(styles['page-design-main-panel'], 'pos-re')}
      ref={connectDropTarget}
      role={DROP_TYPE}
      onMouseDown={onMouseDown}
    >
      <ComponentList />
    </div>
  );
};

const dropTarget = DropTarget(
  DRAG_TYPE,
  {
    drop: (props, monitor, component) => {
      return { name: DROP_TYPE };
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
