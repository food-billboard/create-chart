import IntroductionButton from '@/components/IntroductionButton';

const GlobalLayout = (props: any) => {
  const {
    children,
    location: { pathname },
  } = props;

  if (['viewer'].some((path) => pathname.includes(path))) return children;

  return (
    <>
      {children}
      <IntroductionButton />
    </>
  );
};

export default GlobalLayout;
