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

  const list = useMemo(() => {
    const target = COMPONENT_TYPE_LIST.find((item) => item.type === type);
    if (!target) return <Empty />;
    return target.children.map((item) => {
      const { type, title, children } = item;
      return (
        <Panel key={type} header={title}>
          <Row gutter={24}>
            {children && children.length ? (
              children.map((item) => {
                return <ComponentItem {...item} key={item.type} />;
              })
            ) : (
              <Empty />
            )}
          </Row>
        </Panel>
      );
    });
  }, [type]);

  return (
    <Collapse
      className={classnames(
        styles['design-left-component-list'],
        'border-r-8',
        'normal-background',
      )}
      bordered={false}
      defaultActiveKey={[1]}
      expandIcon={({ isActive }) => (
        <CaretRightOutlined rotate={isActive ? 90 : 0} />
      )}
    >
      {list}
    </Collapse>
  );
};

export default ComponentList;
