import Empty from '@/components/Empty';
import { ConnectState } from '@/models/connect';
import { CaretRightOutlined } from '@ant-design/icons';
import { Collapse, Row } from 'antd';
import classnames from 'classnames';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { connect } from 'umi';
import { COMPONENT_TYPE_LIST } from '../../../../utils/component';
import styles from './index.less';
import ComponentItem from './item';

const { Panel } = Collapse;

const ComponentList = (props: { type: string; componentCollapse: boolean }) => {
  const { type, componentCollapse } = props;

  const [activeKey, setActiveKey] = useState<string[]>([]);

  const target = useMemo(() => {
    return COMPONENT_TYPE_LIST.find((item) => item.type === type);
  }, [type]);

  const onCollapseChange = useCallback((key) => {
    setActiveKey(key);
  }, []);

  const list = useMemo(() => {
    if (!target?.children.length) return null;
    return target.children.map((item) => {
      const { type, title, children } = item;
      return (
        <Panel key={type} header={title}>
          <Row gutter={24}>
            {children && children.length ? (
              children.map((item) => {
                return <ComponentItem {...(item as any)} key={item.type} />;
              })
            ) : (
              <Empty />
            )}
          </Row>
        </Panel>
      );
    });
  }, [target]);

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

  useEffect(() => {
    if (target?.children.length) {
      const firstList = target.children.find((item) => !!item.children.length);
      if (firstList) {
        setActiveKey([firstList.type]);
      }
    }
  }, [target]);

  return (
    <Collapse
      className={classnames(
        styles['design-left-component-list'],
        {
          [styles['design-left-component-list-show']]: !componentCollapse,
        },
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
    >
      {list}
    </Collapse>
  );
};

export default connect(
  (state: ConnectState) => {
    return {
      componentCollapse: state.local.componentCollapse,
    };
  },
  () => ({}),
)(ComponentList);
