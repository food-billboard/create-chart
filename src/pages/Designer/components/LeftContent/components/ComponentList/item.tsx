import { Col, Tooltip } from 'antd';
import classnames from 'classnames';
import { useCallback } from 'react';
import { LockOutlined } from '@ant-design/icons';
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
import { createComponent } from '@/utils/Assist/Component';
import DataChangePool from '@/utils/Assist/DataChangePool';
import { mapDispatchToProps, mapStateToProps } from './connect';
import styles from './index.less';

export const DRAG_TYPE = 'COMPONENT_DRAG_TYPE';

export type ComponentItemProps = ComponentData.BaseComponentItem & {
  type: string;
  icon: string;
  title: string;
  development?: boolean;
  isDragging: boolean;
  connectDragSource: ConnectDragSource;
  connectDragPreview: ConnectDragPreview;
  setDragInfo?: (value: Partial<DragData>) => void;
  setSelect: (value: string[]) => void;
};

const ComponentItem = (props: ComponentItemProps) => {
  const {
    icon,
    title,
    description,
    type,
    development,
    connectDragSource,
    connectDragPreview,
    setSelect,
  } = props;

  const handleSelect = useCallback(() => {
    const component = createComponent({
      name: title,
      description,
      componentType: type,
      config: {
        style: {
          left: 0,
          top: 0,
        },
      },
    });

    DataChangePool.setComponent({
      action: 'add',
      id: component.id,
      value: component,
      path: '',
    });

    setSelect([component.id]);
  }, [title, description, setSelect, type]);

  return (
    <>
      <DragPreviewImage connect={connectDragPreview} src={icon} />
      <Col
        span={24}
        className={classnames(
          styles['design-left-component-list-item'],
          'ali-cen',
          {
            [styles['design-left-component-list-item-disabled']]: !!development,
          },
        )}
        ref={connectDragSource}
        role={DRAG_TYPE}
        onClick={handleSelect}
      >
        <Tooltip
          title={
            <div className={styles['design-left-component-list-item-preview']}>
              <img src={icon} />
            </div>
          }
          mouseEnterDelay={1}
          placement={'left'}
        >
          <div
            title={title}
            style={{
              backgroundImage: `url(${icon})`,
            }}
          ></div>
        </Tooltip>
        <div className="ali-cen text-ellipsis" title={title}>
          {title}
        </div>
        {!!development && (
          <div
            className={
              styles['design-left-component-list-item-disabled-prefix']
            }
          >
            <LockOutlined />
            <span>组件开发中</span>
          </div>
        )}
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
      return pick(props, [
        'icon',
        'title',
        'description',
        'type',
        'development',
      ]);
    },
    endDrag(props: ComponentItemProps, monitor: DragSourceMonitor) {},
    canDrag: (props) => {
      return !props.development;
    },
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
