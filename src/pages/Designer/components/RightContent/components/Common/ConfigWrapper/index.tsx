import { ReactNode } from 'react';
import { Tabs } from 'antd';
import classnames from 'classnames';
import styles from './index.less';

// 配置项顶部的tab切换

const ConfigWrapper = (props: {
  children?: ReactNode;
  tabCounter?: number;
}) => {
  const { children, tabCounter = 3 } = props;

  return (
    <Tabs
      centered
      className={classnames(
        styles['design-config-wrapper-header'],
        styles[`design-config-wrapper-header-${tabCounter}`],
      )}
      tabBarGutter={0}
    >
      {children}
    </Tabs>
  );
};

export default ConfigWrapper;
