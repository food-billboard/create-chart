import { ReactNode, Children, useMemo, cloneElement, useRef } from 'react';
import { Tabs } from 'antd';
import { LeftOutlined } from '@ant-design/icons';
import classnames from 'classnames';
import { TabPaneProps } from 'antd/es/tabs';
import { uniqueId } from 'lodash';
import styles from './index.less';

// 配置项顶部的tab切换

const ConfigWrapper = (props: {
  children?: ReactNode;
  tabCounter?: number;
  onBack?: () => void;
  hasBack?: boolean;
  title?: string | false;
}) => {
  const { children, tabCounter = 3, onBack, hasBack, title = false } = props;

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
    title?: string | false;
  },
) => {
  const {
    children,
    hasBack,
    onBack,
    title = false,
    version = 'v1.0.0',
    ...nextProps
  } = props;

  const scrollBarId = useRef<string>(uniqueId('design-config-item'));

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
              title={title || ''}
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
            <span>{title && `${version} | ${title}`}</span>
          </div>
        </div>
      </div>
      <div
        id={scrollBarId.current}
        className={classnames(
          styles['design-config-wrapper-item-content'],
          'zero-scrollbar',
        )}
      >
        <div className={styles['design-config-wrapper-item-content-main']}>
          {children}
        </div>
      </div>
    </Tabs.TabPane>
  );
};

export default ConfigWrapper;
