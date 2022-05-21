import { useEffect, ReactNode, useState, useMemo, useCallback } from 'react';
import { connect } from 'dva';
import { Empty, Layout as AntLayout, Menu, Breadcrumb } from 'antd';
import classnames from 'classnames';
import isMobileJudge from 'is-mobile';
import { get } from 'lodash';
import { history } from 'umi';
import { ConnectState } from '@/models/connect';
import Loading from '@/components/PageLoading';
import IntroductionButton from '@/components/IntroductionButton';
import { dispatchLogin } from '@/utils/request';
import Avatar from './components/Avatar';
import { mapDispatchToProps, mapStateToProps } from './connect';
import styles from './index.less';

const { Header, Content, Footer } = AntLayout;

const PATH_MAP: any = {
  '/model': 'model',
  '/list': 'home',
};

const LoginWrapper = (props: {
  children: ReactNode;
  location: any;
  getUserInfo: () => Promise<any>;
}) => {
  const {
    children,
    location: { pathname },
    getUserInfo,
  } = props;

  const [fetchLoading, setFetchLoading] = useState<boolean>(true);

  const fetchUserInfo = async () => {
    setFetchLoading(true);
    try {
      await getUserInfo();
    } catch (err) {
      dispatchLogin(err);
    } finally {
      setFetchLoading(false);
    }
  };

  useEffect(() => {
    fetchUserInfo();
  }, [pathname]);

  if (fetchLoading) return <Loading />;

  return (
    <>
      {children}
      <IntroductionButton />
    </>
  );
};

const FetchLoginWrapper = connect(
  mapStateToProps,
  mapDispatchToProps,
)(LoginWrapper);

// 外部layout
const Layout = (props: { children?: ReactNode; pathname: string }) => {
  const { pathname } = props;

  const [activeKey, setActiveKey] = useState<string>(() => {
    return PATH_MAP[pathname] || 'home';
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
        case 'home':
          path = '/';
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
        >
          <Menu.Item key={'home'}>首页</Menu.Item>
          <Menu.Item key={'model'}>模板</Menu.Item>
        </Menu>
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

const GlobalLayout = (props: any) => {
  const {
    children,
    location: { pathname },
  } = props;

  const isMobile = useMemo(() => {
    return isMobileJudge();
  }, [pathname]);

  if (isMobile)
    return (
      <Empty
        description="请在电脑端使用"
        style={{
          position: 'relative',
          top: '50%',
          transform: 'translateY(-50%)',
        }}
      />
    );

  // 分享页不用管登录
  if (pathname === '/share') return children;
  if (
    pathname.startsWith('/login') ||
    pathname.startsWith('/register') ||
    pathname.startsWith('/forget')
  ) {
    return (
      <>
        {children}
        <IntroductionButton />
      </>
    );
  }

  if (pathname === '/list' || pathname === '/model' || pathname === '/') {
    return (
      <Layout pathname={pathname}>
        {children}
        <IntroductionButton />
      </Layout>
    );
  }

  return <FetchLoginWrapper {...props} />;
};

// 设置document title
const DocumentTitleSetWrapper = (props: any) => {
  const { screenName, ...nextProps } = props;
  const { pathname } = nextProps.location || {};

  const reload = () => {
    let title = '大屏设计器';
    if (pathname.startsWith('/login')) {
      title = '登录';
    } else if (pathname.startsWith('/register')) {
      title = '注册';
    } else if (pathname.startsWith('/forget')) {
      title = '忘记密码';
    } else if (
      pathname.startsWith('/model-preview') ||
      pathname.startsWith('/model-designer') ||
      pathname.startsWith('/preview') ||
      pathname.startsWith('/share') ||
      pathname.startsWith('/designer')
    ) {
      title = screenName;
    } else if (pathname.startsWith('/model')) {
      title = '大屏模板';
    } else if (pathname === '/') {
      title = '大屏列表';
    }
    document.title = title;
  };

  const dom = useMemo(() => {
    return <GlobalLayout {...nextProps} />;
  }, [nextProps]);

  useEffect(() => {
    reload();
  }, [screenName, pathname]);

  return dom;
};

export default connect(
  (state: ConnectState) => {
    return {
      screenName: get(state, 'global.screenData.name') || '大屏设计器',
    };
  },
  () => ({}),
)(DocumentTitleSetWrapper);
