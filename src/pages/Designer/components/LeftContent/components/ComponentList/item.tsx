import { Col } from 'antd';
import classnames from 'classnames';
import { useCallback, ReactNode } from 'react';
import { LockOutlined } from '@ant-design/icons';
import {
  DragSourceMonitor,
  ConnectDragSource,
  DragSource,
  DragSourceConnector,
  DragPreviewImage,
  ConnectDragPreview,
} from 'react-dnd';
import { pick } from 'lodash';
import { mobxStore } from '@/hooks';
import { createComponent } from '@/utils/Assist/Component';
import DataChangePool from '@/utils/Assist/DataChangePool';
import styles from './index.less';

export const DRAG_TYPE = 'COMPONENT_DRAG_TYPE';

export type ComponentItemProps = ComponentData.BaseComponentItem & {
  type: string;
  icon: string;
  title: string;
  development?: boolean;
  disabled?: boolean;
  isDragging: boolean;
  prefix?: ReactNode;
  suffix?: ReactNode;
  tooltip?: boolean;
  connectDragSource: ConnectDragSource;
  connectDragPreview: ConnectDragPreview;
};

const ComponentItem = (props: ComponentItemProps) => {
  const {
    icon,
    title,
    description,
    type,
    development,
    disabled,
    connectDragSource,
    connectDragPreview,
    suffix,
    prefix,
    tooltip = true,
  } = props;

  const handleSelect = useCallback(() => {
    if (disabled || development) return;
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

    mobxStore.global.setSelect([component.id]);
  }, [title, description, type, disabled, development]);

  return (
    <>
      <DragPreviewImage connect={connectDragPreview} src={icon} />
      <Col
        span={24}
        className={classnames(
          styles['design-left-component-list-item'],
          'ali-cen',
          {
            [styles['design-left-component-list-item-disabled']]:
              !!development || !!disabled,
          },
        )}
        ref={connectDragSource}
        role={DRAG_TYPE}
        onClick={handleSelect}
      >
        {/* 暂时先不要大图预览组件了 */}
        {/* <Tooltip
          title={
            <div className={styles['design-left-component-list-item-preview']}>
              <img src={icon} />
            </div>
          }
          mouseEnterDelay={1}
          placement={'left'}
          {...(!!tooltip ? {} : { open: false })}
        >
          {prefix}
          <div
            title={title}
            style={{
              backgroundImage: `url(${icon})`,
            }}
            className={styles['design-left-component-list-item-icon']}
          ></div>
        </Tooltip> */}
        {prefix}
        <div
          title={title}
          style={{
            backgroundImage: `url(${icon})`,
          }}
          className={styles['design-left-component-list-item-icon']}
        ></div>
        <div
          className={classnames(
            'ali-cen text-ellipsis',
            styles['design-left-component-list-item-title'],
          )}
          title={title}
        >
          {title}
        </div>
        {suffix}
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
        {!!disabled && (
          <div
            className={
              styles['design-left-component-list-item-disabled-prefix']
            }
          >
            <LockOutlined />
            <span>组价不可用</span>
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
      mobxStore.global.setDragInfo({
        value: pick(props, ['icon', 'title', 'description', 'type']) as any,
      });
      return pick(props, [
        'icon',
        'title',
        'description',
        'type',
        'development',
        'prefix',
        'suffix',
        'tooltip',
        'disabled',
      ]);
    },
    endDrag(props: ComponentItemProps, monitor: DragSourceMonitor) {},
    canDrag: (props) => {
      return !props.development && !props.disabled;
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

export default dragSource as any;
