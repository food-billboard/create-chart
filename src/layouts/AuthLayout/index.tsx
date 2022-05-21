import {} from 'react';
import { useGetUserInfo } from '@/hooks';

const AuthLayout = (props: any) => {
  const { location, children } = props;

  useGetUserInfo(location);

  return <>{children}</>;
};

export default AuthLayout;
