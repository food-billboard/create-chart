import { useGetUserInfo } from '@/hooks';
import { useLocation } from 'umi';

const AuthLayout = (props: any) => {
  const { children } = props;

  const location = useLocation();

  useGetUserInfo(location);

  return <>{children}</>;
};

export default AuthLayout;
