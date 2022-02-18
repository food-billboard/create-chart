import { Col } from 'antd';
import classnames from 'classnames';
import {
  DragSourceMonitor,
  ConnectDragSource,
  DragSource,
  DragSourceConnector,
  DragPreviewImage,
  ConnectDragPreview,
} from 'react-dnd';
import { connect } from 'dva';
import { pick } from 'lodash';
import { DragData } from '@/models/connect';
import { mapDispatchToProps, mapStateToProps } from './connect';
import styles from './index.less';

export const DRAG_TYPE = 'COMPONENT_DRAG_TYPE';

export type ComponentItemProps = ComponentData.BaseComponentItem & {
  type: string;
  icon: string;
  title: string;
  isDragging: boolean;
  connectDragSource: ConnectDragSource;
  connectDragPreview: ConnectDragPreview;
  setDragInfo?: (value: Partial<DragData>) => void;
};

const ComponentItem = (props: ComponentItemProps) => {
  const { icon, title, connectDragSource, connectDragPreview } = props;

  return (
    <>
      <DragPreviewImage connect={connectDragPreview} src={icon} />
      <Col
        span={12}
        className={classnames(
          styles['design-left-component-list-item'],
          'ali-cen',
        )}
        ref={connectDragSource}
        role={DRAG_TYPE}
      >
        <div
          title={title}
          style={{
            backgroundImage: `url(${icon})`,
          }}
        ></div>
        <div className="ali-cen text-ellipsis" title={title}>
          {title}
        </div>
      </Col>
    </>
  );
};

const dragSource = DragSource(
  DRAG_TYPE,
  {
    beginDrag: (props: ComponentItemProps) => {
      props.setDragInfo?.({
        value: pick(props, ['icon', 'title', 'description', 'type']),
      });
      return pick(props, ['icon', 'title', 'description', 'type']);
    },
    endDrag(props: ComponentItemProps, monitor: DragSourceMonitor) {},
  },
  (connect: DragSourceConnector, monitor: DragSourceMonitor) => {
    return {
      connectDragSource: connect.dragSource(),
      connectDragPreview: connect.dragPreview(),
      isDragging: monitor.isDragging(),
    };
  },
)(ComponentItem);

export default connect(mapStateToProps, mapDispatchToProps)(dragSource);
