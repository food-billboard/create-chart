import { useGetUserInfo } from '@/hooks';
import { Outlet, useLocation } from 'umi';

const AuthLayout = (props: any) => {
  const location = useLocation();

  useGetUserInfo(location);

  return <Outlet />;
};

export default AuthLayout;
