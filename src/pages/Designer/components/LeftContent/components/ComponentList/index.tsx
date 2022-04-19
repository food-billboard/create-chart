import { useMemo } from 'react';
import { Row, Collapse } from 'antd';
import { CaretRightOutlined } from '@ant-design/icons';
import classnames from 'classnames';
import Empty from '@/components/Empty';
import { COMPONENT_TYPE_LIST } from '@/utils/constants';
import ComponentItem from './item';
import styles from './index.less';

const { Panel } = Collapse;

const ComponentList = (props: { type: string }) => {
  const { type } = props;

  const target = useMemo(() => {
    return COMPONENT_TYPE_LIST.find((item) => item.type === type);
  }, [type]);

  const defaultActiveKey = useMemo(() => {
    if (!target?.children.length) return [];
    const firstList = target.children.find((item) => !!item.children.length);
    if (!firstList) return [];
    return [firstList.type];
  }, [target]);

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

  return (
    <Collapse
      className={classnames(
        styles['design-left-component-list'],
        'border-r-8',
        'normal-background',
        'zero-scrollbar',
      )}
      bordered={false}
      ghost
      defaultActiveKey={defaultActiveKey}
      expandIcon={({ isActive }) => (
        <CaretRightOutlined rotate={isActive ? 90 : 0} />
      )}
    >
      {list}
    </Collapse>
  );
};

export default ComponentList;
