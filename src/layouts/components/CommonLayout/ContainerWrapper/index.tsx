import { useMemo } from 'react';
import { Empty } from 'antd';
import isMobileJudge from 'is-mobile';
import { history } from 'umi';
import IntroductionButton from '@/components/IntroductionButton';
import FetchLoginWrapper from '../FetchLoginWrapper';
import Layout from '../Listlayout';

const GlobalLayout = (props: any) => {
  const {
    children,
    location: { pathname, search },
  } = props;

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
  if (['/share', '/', 'viewer', '/preview'].includes(pathname)) return children;
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

  if (['/screen', '/model'].includes(pathname)) {
    return (
      <FetchLoginWrapper {...props}>
        <Layout pathname={pathname}>{children}</Layout>
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
