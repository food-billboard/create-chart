import { useEffect, ReactNode, useState, useMemo } from 'react';
import { connect } from 'dva';
import { Empty } from 'antd';
import isMobileJudge from 'is-mobile';
import Loading from '@/components/PageLoading';
import IntroductionButton from '@/components/IntroductionButton';
import { dispatchLogin } from '@/utils/request';
import { mapDispatchToProps, mapStateToProps } from './connect';

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
  const [isMobile, setIsMobile] = useState<boolean>(false);

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
    setIsMobile(isMobileJudge());
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

const GlobalLayout = (props: any) => {
  const {
    children,
    location: { pathname },
  } = props;

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

  return <FetchLoginWrapper {...props} />;
};

export default GlobalLayout;
