import { useEffect, ReactNode, useState } from 'react';
import { connect } from 'dva';
import Loading from '@/components/PageLoading';
import { getUserInfo } from '@/services';
import { mapDispatchToProps, mapStateToProps } from './connect';

const LoginWrapper = (props: { children: ReactNode; location: any }) => {
  const {
    children,
    location: { pathname },
  } = props;

  const [fetchLoading, setFetchLoading] = useState<boolean>(true);

  const fetchUserInfo = async () => {
    setFetchLoading(true);
    await getUserInfo();
    setFetchLoading(false);
  };

  useEffect(() => {
    fetchUserInfo();
  }, [pathname]);

  if (fetchLoading) return <Loading />;

  return <>{children}</>;
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
  if (
    pathname === '/share' ||
    pathname.startsWith('/login') ||
    pathname.startsWith('/register') ||
    pathname.startsWith('/forget')
  ) {
    return children;
  }

  return <FetchLoginWrapper {...props} />;
};

export default GlobalLayout;
