import { CaretRightOutlined } from '@ant-design/icons';
import { Collapse, Row } from 'antd';
import classnames from 'classnames';
import type { ItemType } from 'rc-collapse/es/interface';
import { useCallback, useEffect, useMemo, useState } from 'react';
import Empty from '@/components/Empty';
import { COMPONENT_TYPE_LIST } from '../../../../utils/component';
import styles from './index.less';
import ComponentItem from './item';

const ComponentList = ({ type }: { type: string }) => {
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
        description="暂无组件"
        className={classnames(
          styles['design-left-component-list'],
          'border-r-8',
          'normal-background',
        )}
      />
    );

  return (
    <div className={classnames(styles['design-left-component-list'])}>
      {list.length > 2 && (
        <div className={styles['design-left-component-list-label']}>
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

  return (
    <Collapse
      className={classnames(
        styles['design-left-component-list'],
        styles['design-left-component-list-show'],
        'normal-background',
        'zero-scrollbar',
        'design-left-component-list',
      )}
      bordered={false}
      ghost
      activeKey={activeKey}
      expandIcon={({ isActive }) => (
        <CaretRightOutlined rotate={isActive ? 90 : 0} />
      )}
      onChange={onCollapseChange}
      items={list}
    />
  );
};

export default ComponentList;
