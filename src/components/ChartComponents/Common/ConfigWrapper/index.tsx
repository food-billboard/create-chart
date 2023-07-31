import { LeftOutlined } from '@ant-design/icons';
import { Tabs, ConfigProvider } from 'antd';
import type { TabsProps } from 'antd';
import classnames from 'classnames';
import { uniqueId } from 'lodash';
import { ReactNode, useMemo, cloneElement, useRef } from 'react';
import styles from './index.less';

// 配置项顶部的tab切换

const ConfigWrapper = (props: {
  children?: ReactNode;
  tabCounter?: number;
  onBack?: () => void;
  hasBack?: boolean;
  title?: string | false;
  items: TabsProps['items'];
}) => {
  const { items = [], tabCounter = 3, onBack, hasBack, title = false } = props;

  const realItems = useMemo(() => {
    return items.map((child) => {
      return {
        ...child,
        children: cloneElement(child.children as any, {
          onBack,
          hasBack,
          title,
        }),
      };
    });
  }, [items]);

  return (
    <ConfigProvider
      theme={{
        components: {
          Tabs: {
            titleFontSizeSM: 14,
          },
        },
      }}
    >
      <Tabs
        centered
        className={classnames(
          'h-100',
          styles['design-config-wrapper-header'],
          styles[`design-config-wrapper-header-${tabCounter}`],
        )}
        tabBarGutter={0}
        items={realItems}
      />
    </ConfigProvider>
  );
};

export const ConfigItem = (props: {
  onBack?: () => void;
  hasBack?: boolean;
  version?: string;
  title?: string | false;
  children?: ReactNode;
}) => {
  const { children, hasBack, onBack, title = false, version = 'v1.0' } = props;

  const scrollBarId = useRef<string>(uniqueId('design-config-item'));

  return (
    <div>
      {title !== false && (
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
      )}
      <div
        id={scrollBarId.current}
        style={{
          top: title === false ? 0 : 60,
        }}
        className={classnames(
          styles['design-config-wrapper-item-content'],
          'zero-scrollbar',
        )}
      >
        <div className={styles['design-config-wrapper-item-content-main']}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default ConfigWrapper;
