import { Tabs } from 'antd';
import type { TabsProps } from 'antd';
import classnames from 'classnames';
import { ReactNode } from 'react';
import styles from './index.less';

// 组件的定制化配置的tabs

const ComponentOptionConfig = (props: { items?: TabsProps['items'] }) => {
  const { items = [] } = props;

  return (
    <Tabs
      tabPosition={'left'}
      defaultActiveKey="0"
      className={styles['design-config-default-tab']}
      items={items}
    />
  );
};

export type TabProps = { icon?: ReactNode; children?: ReactNode };

export const Tab = (props: TabProps) => {
  const { icon, children } = props;

  return (
    <div
      className={classnames(
        styles['design-config-default-tab-title'],
        'dis-flex-column',
      )}
    >
      {icon}
      <div>{children}</div>
    </div>
  );
};

export default ComponentOptionConfig;
