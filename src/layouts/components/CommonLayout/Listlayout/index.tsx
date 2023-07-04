import { useState, useCallback } from 'react';
import type { ReactNode } from 'react';
import { Layout as AntLayout, Menu, Breadcrumb } from 'antd';
import { history } from 'umi';
import classnames from 'classnames';
import Avatar from '../../Avatar';
import styles from './index.less';

const { Header, Content, Footer } = AntLayout;

const PATH_MAP: any = {
  '/model': 'model',
  '/screen': 'screen',
};

// 外部layout
const Layout = (props: { children?: ReactNode; pathname: string }) => {
  const { pathname } = props;

  const [activeKey, setActiveKey] = useState<string>(() => {
    return PATH_MAP[pathname] || 'screen';
  });

  const handleClick = useCallback(
    ({ key }) => {
      setActiveKey(key);
      let path = '';
      if (activeKey === key) return;
      switch (key) {
        case 'model':
          path = '/model';
          break;
        case 'screen':
          path = '/screen';
          break;
      }
      history.push(path);
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
              key: 'screen',
            },
            {
              label: '模板',
              key: 'model',
            },
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
        <Breadcrumb style={{ margin: '16px 0', visibility: 'hidden' }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
        </Breadcrumb>
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
