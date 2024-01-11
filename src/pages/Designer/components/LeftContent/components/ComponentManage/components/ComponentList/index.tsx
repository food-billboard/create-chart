import { Row } from 'antd';
import classnames from 'classnames';
import type { ItemType } from 'rc-collapse/es/interface';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { connect } from 'umi';
import Empty from '@/components/Empty';
import { ConnectState } from '@/models/connect';
import { COMPONENT_LIST_WIDTH } from '@/utils/constants/another';
import { COMPONENT_SUB_TYPE_WIDTH } from '@/utils/constants/another';
import { COMPONENT_TYPE_LIST } from '../../../../../../utils/component';
import { EXTRA_TYPE_EMPTY_DESC_MAP } from '../ComponentTypeList/components/ExtraComponentTypeList';
import styles from './index.less';
import ComponentItem from './item';

const ComponentList = ({
  type,
  componentCollapse,
}: {
  type: string;
  componentCollapse: boolean;
}) => {
  const [activeKey, setActiveKey] = useState<string>('All');

  const target = useMemo(() => {
    return COMPONENT_TYPE_LIST.find((item) => item.type === type);
  }, [type]);

  const onCollapseChange = useCallback((key) => {
    setActiveKey(key);
  }, []);

  const list: ItemType[] = useMemo(() => {
    if (!target?.children.length) return [];
    return [
      {
        type: 'All',
        title: '全部',
        children: target.children.reduce<ComponentType.ComponentChildren[]>(
          (acc, cur) => {
            acc.push(...cur.children);
            return acc;
          },
          [],
        ),
      },
      ...target.children,
    ].map((item) => {
      const { type, title, children } = item;
      return {
        key: type,
        label: title,
        children: (
          <Row gutter={24} style={{ margin: 0 }}>
            {children && children.length ? (
              children.map((item) => {
                return <ComponentItem {...(item as any)} key={item.type} />;
              })
            ) : (
              <Empty />
            )}
          </Row>
        ),
      };
    });
  }, [target]);

  useEffect(() => {
    setActiveKey('All');
  }, [type]);

  if (!target?.children.length)
    return (
      <Empty
        description={(EXTRA_TYPE_EMPTY_DESC_MAP as any)[type] || '暂无组件'}
        className={classnames(
          styles['design-left-component-list'],
          styles['design-left-component-list-empty'],
          'border-r-8',
          'normal-background',
          'h-100',
          'dis-flex',
        )}
      />
    );

  return (
    <div
      className={classnames(
        styles['design-left-component-list'],
        'h-100 pos-re dis-flex',
      )}
      style={
        componentCollapse
          ? { border: 'none', width: 0 }
          : { width: COMPONENT_LIST_WIDTH }
      }
    >
      {list.length > 2 && (
        <div
          className={classnames(
            styles['design-left-component-list-label'],
            'zero-scrollbar',
          )}
          style={{
            // @ts-ignore
            '--type-width': `${COMPONENT_SUB_TYPE_WIDTH}px`,
          }}
        >
          {list.map((item) => {
            const { key, label } = item;
            return (
              <div
                className={classnames(
                  styles['design-left-component-list-item'],
                  {
                    [styles['design-left-component-list-item-active']]:
                      key === activeKey,
                  },
                )}
                onClick={onCollapseChange.bind(null, key)}
                key={key}
              >
                {label}
              </div>
            );
          })}
        </div>
      )}
      <div className={styles['design-left-component-list-main']}>
        {list.find((item) => item.key === activeKey)?.children || null}
      </div>
    </div>
  );
};

export default connect(
  (state: ConnectState) => {
    return {
      componentCollapse: state.local.componentCollapse,
    };
  },
  () => {
    return {};
  },
)(ComponentList);
