import { Layout as AntLayout, Menu } from 'antd';
import classnames from 'classnames';
import type { ReactNode } from 'react';
import { useCallback, useState } from 'react';
import { history, useLocation } from 'umi';
import GlobalConfig from '@/utils/Assist/GlobalConfig';
import Avatar from '../../Avatar';
import styles from './index.less';

const { Header, Content, Footer } = AntLayout;

// 外部layout
const Layout = (props: { children?: ReactNode }) => {
  const { pathname } = useLocation();

  const [activeKey, setActiveKey] = useState<string>(() => {
    return pathname || '/screen';
  });

  const handleClick = useCallback(
    ({ key }) => {
      setActiveKey(key);
      if (activeKey === key) return;
      history.push(key);
    },
    [activeKey],
  );

  return (
    <AntLayout className={styles['screen-page']}>
      <Header>
        <div className={styles['screen-page-logo']} />
        <Menu
          theme="dark"
          mode="horizontal"
          selectedKeys={[activeKey]}
          onClick={handleClick}
          items={[
            {
              label: '大屏',
              key: '/screen',
            },
            {
              label: '模板',
              key: '/model',
            },
            ...(GlobalConfig.IS_IMPROVE_BACKEND
              ? [
                  {
                    label: '媒体资源',
                    key: '/media',
                  },
                  {
                    label: '数据源',
                    key: '/data',
                  },
                ]
              : []),
          ]}
        />
        <div className={styles['screen-page-avatar']}>
          <Avatar />
        </div>
      </Header>
      <Content
        className={styles['screen-page-content']}
        style={{ padding: '0 50px' }}
      >
        <div
          className={classnames(
            styles['screen-page-content-main'],
            'border-r-16',
          )}
        >
          {props.children}
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>Daniel Screen ©2022</Footer>
    </AntLayout>
  );
};

export default Layout;
