import { useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { connect } from 'dva';
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
