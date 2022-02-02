import { ReactNode } from 'react';
import { Tabs } from 'antd';
import classnames from 'classnames';
import { TabPaneProps } from 'antd/es/tabs';
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
        'h-100',
        styles['design-config-wrapper-header'],
        styles[`design-config-wrapper-header-${tabCounter}`],
      )}
      tabBarGutter={0}
    >
      {children}
    </Tabs>
  );
};

export const ConfigItem = (props: TabPaneProps & {}) => {
  const { children, ...nextProps } = props;

  return (
    <Tabs.TabPane {...nextProps}>
      <div className={styles['design-config-wrapper-item-title']}>
        <div className={styles['design-config-wrapper-item-title-content']}>
          <div
            className={styles['design-config-wrapper-item-title-content-main']}
          >
            <span
              className={classnames(
                styles['design-config-wrapper-item-title-content-main'],
                'text-ellipsis',
                'dis-flex',
              )}
              title="垂直胶囊柱状图"
            >
              垂直胶囊柱状图
            </span>
          </div>
          <div
            className={classnames(
              styles['design-config-wrapper-item-title-content-sub'],
              'dis-flex',
            )}
          >
            <span>v3.0.15 | 垂直胶囊柱状图</span>
          </div>
        </div>
      </div>
      <div className={styles['design-config-wrapper-item-content']}>
        <div className={styles['design-config-wrapper-item-content-main']}>
          {children}
        </div>
      </div>
    </Tabs.TabPane>
  );
};

export default ConfigWrapper;
