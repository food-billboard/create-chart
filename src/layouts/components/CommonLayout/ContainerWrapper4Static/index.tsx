import { useLocation } from 'umi';
import IntroductionButton from '@/components/IntroductionButton';

const GlobalLayout = (props: any) => {
  const { Component } = props;

  const { pathname } = useLocation();

  if (['viewer', 'static-share'].some((path) => pathname.includes(path)))
    return <Component />;

  return (
    <>
      <Component />
      <IntroductionButton />
    </>
  );
};

export default GlobalLayout;
