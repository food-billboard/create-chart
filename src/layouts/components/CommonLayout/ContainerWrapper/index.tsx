import IntroductionButton from '@/components/IntroductionButton';
import { Empty } from 'antd';
import isMobileJudge from 'is-mobile';
import { useMemo } from 'react';
import { history, Outlet, useLocation } from 'umi';
import FetchLoginWrapper from '../FetchLoginWrapper';
import Layout from '../Listlayout';

const GlobalLayout = (props: any) => {
  const { Component } = props;

  const { pathname, search } = useLocation();

  const isMobile = useMemo(() => {
    return isMobileJudge();
  }, [pathname]);

  if (
    isMobile &&
    !['/', '/model-preview', '/preview', '/share'].includes(pathname)
  )
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
  if (['/share', '/', 'viewer', '/preview'].includes(pathname)) {
    return <Outlet />;
  }
  if (
    pathname.startsWith('/login') ||
    pathname.startsWith('/register') ||
    pathname.startsWith('/forget')
  ) {
    return (
      <>
        <Outlet />
        <IntroductionButton />
      </>
    );
  }

  if (['/screen', '/model'].includes(pathname)) {
    return (
      <FetchLoginWrapper {...props}>
        <Layout>
          <Outlet />
        </Layout>
      </FetchLoginWrapper>
    );
  }

  // 设计器无id情况下返回列表
  if (pathname.includes('designer') && !search.includes('id')) {
    const path = pathname.includes('model') ? 'model' : 'screen';
    history.replace(path);
    return <div></div>;
  }

  return <FetchLoginWrapper {...props} />;
};

export default GlobalLayout;
