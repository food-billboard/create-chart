import { useEffect, useMemo } from 'react';
import { connect } from 'dva';
import { get } from 'lodash';
import { ConnectState } from '@/models/connect';
import IntroductionButton from '@/components/IntroductionButton';
import PromptChrome from '@/components/PromptChrome';

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
const EnvironmentPrompt = (props: any) => {
  return (
    <PromptChrome>
      <DocumentTitleSetWrapper {...props} />
    </PromptChrome>
  );
};

export default connect(
  (state: ConnectState) => {
    return {
      screenName: get(state, 'global.screenData.name') || '大屏设计器',
    };
  },
  () => ({}),
)(EnvironmentPrompt);
