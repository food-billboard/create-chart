import classnames from 'classnames';
import { useEffect } from 'react';
import {
  ConnectDropTarget,
  DropTargetMonitor,
  DropTarget,
  DropTargetConnector,
} from 'react-dnd';
import { connect } from 'dva';
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
};

const Painter = (props: PainterProps) => {
  const { dragInfo, connectDropTarget, setDragInfo, didDrop } = props;

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
    >
      painter
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
