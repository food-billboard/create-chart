import { useEffect, useMemo } from 'react';
import { observer } from 'mobx-react-lite';
import IntroductionButton from '@/components/IntroductionButton';
import PromptChrome from '@/components/PromptChrome';
import { useMobxContext, MobxContext, mobxStore } from '../../hooks';

const GlobalLayout = (props: any) => {
  const {
    children,
    location: { pathname },
  } = props;

  if (['viewer'].includes(pathname)) return children;

  return (
    <>
      {children}
      <IntroductionButton />
    </>
  );
};

// 设置document title
const DocumentTitleSetWrapper = (props: any) => {
  const { screenName, ...nextProps } = props;
  const { pathname } = nextProps.location || {};

  const reload = () => {
    let title = screenName || '大屏设计器';
    document.title = title;
  };

  const dom = useMemo(() => {
    return <GlobalLayout {...nextProps} />;
  }, [nextProps]);

  useEffect(() => {
    reload();
  }, [screenName, pathname]);

  return dom;
};

// 环境判断
const EnvironmentPrompt = observer((props: any) => {
  const {
    global: {
      screenData: { name },
    },
  } = useMobxContext();

  return (
    <PromptChrome>
      <DocumentTitleSetWrapper {...props} screenName={name} />
    </PromptChrome>
  );
});

// 最外层的mobx包裹层
const MobxWrapper = (props: any) => {
  return (
    <MobxContext.Provider value={mobxStore}>
      <EnvironmentPrompt {...props} />
    </MobxContext.Provider>
  );
};

export default MobxWrapper;
