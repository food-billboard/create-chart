import IntroductionButton from '@/components/IntroductionButton';
import { useLocation } from 'umi';

const GlobalLayout = (props: any) => {
  const { Component } = props;

  const { pathname } = useLocation();

  if (['viewer'].some((path) => pathname.includes(path))) return <Component />;

  return (
    <>
      <Component />
      <IntroductionButton />
    </>
  );
};

export default GlobalLayout;
