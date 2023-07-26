import IntroductionButton from '@/components/IntroductionButton';
import Loading from '@/components/PageLoading';
import { dispatchLogin } from '@/utils/request';
import type { ReactNode } from 'react';
import { useEffect, useState } from 'react';
import { connect, useLocation } from 'umi';
import { mapDispatchToProps, mapStateToProps } from './connect';

const LoginWrapper = (props: {
  children: ReactNode;
  location: any;
  getUserInfo: () => Promise<any>;
}) => {
  const { children, getUserInfo } = props;

  const { pathname } = useLocation();

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

export default FetchLoginWrapper;
