import { ReactNode, Children, useMemo, cloneElement } from 'react';
import { Tabs } from 'antd';
import { LeftOutlined } from '@ant-design/icons';
import classnames from 'classnames';
import { TabPaneProps } from 'antd/es/tabs';
import styles from './index.less';

// 配置项顶部的tab切换

const ConfigWrapper = (props: {
  children?: ReactNode;
  tabCounter?: number;
  onBack?: () => void;
  hasBack?: boolean;
  title: string;
}) => {
  const { children, tabCounter = 3, onBack, hasBack, title } = props;

  const realChildren = useMemo(() => {
    return Children.map(children, (child) => {
      return cloneElement(child as any, {
        onBack,
        hasBack,
        title,
      });
    });
  }, [children]);

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
      {realChildren}
    </Tabs>
  );
};

export const ConfigItem = (
  props: TabPaneProps & {
    onBack?: () => void;
    hasBack?: boolean;
    version?: string;
    title?: string;
  },
) => {
  const {
    children,
    hasBack,
    onBack,
    title,
    version = 'v1.0.0',
    ...nextProps
  } = props;

  return (
    <Tabs.TabPane {...nextProps}>
      <div className={styles['design-config-wrapper-item-title']}>
        <div className={styles['design-config-wrapper-item-title-content']}>
          <div
            className={classnames(
              styles['design-config-wrapper-item-title-content-main'],
              'dis-flex',
            )}
          >
            {!!hasBack && (
              <LeftOutlined
                className="c-po"
                title="返回上一级"
                onClick={onBack}
              />
            )}
            <span
              className={classnames('text-ellipsis', 'dis-flex')}
              title={title}
            >
              {title}
            </span>
          </div>
          <div
            className={classnames(
              styles['design-config-wrapper-item-title-content-sub'],
              'dis-flex',
            )}
          >
            <span>
              {version} | {title}
            </span>
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
