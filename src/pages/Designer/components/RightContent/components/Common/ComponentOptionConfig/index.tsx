import { ReactNode } from 'react';
import { Tabs } from 'antd';
import classnames from 'classnames';
import styles from './index.less';
import { AppleFilled } from '@ant-design/icons';

const { TabPane } = Tabs;

const ComponentOptionConfig = (props: { children?: ReactNode }) => {
  const { children } = props;

  return (
    <Tabs
      tabPosition={'left'}
      defaultActiveKey="0"
      className={styles['design-config-default-tab']}
    >
      {children}
    </Tabs>
  );
};

export const Tab = (props: { icon?: ReactNode; children?: ReactNode }) => {
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
