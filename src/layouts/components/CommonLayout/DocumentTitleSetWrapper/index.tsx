import { useEffect, useMemo } from 'react';

// 设置document title
const DocumentTitleSetWrapper = (props: any) => {
  const { screenName, Component, ...nextProps } = props;
  const { pathname } = nextProps.location || {};

  const reload = () => {
    let title = '大屏设计器';
    if (pathname.startsWith('/login')) {
      title = '登录';
    } else if (pathname.startsWith('/register')) {
      title = '注册';
    } else if (pathname.startsWith('/forget')) {
      title = '忘记密码';
    } else if (
      pathname.startsWith('/model-preview') ||
      pathname.startsWith('/model-designer') ||
      pathname.startsWith('/preview') ||
      pathname.startsWith('/share') ||
      pathname.startsWith('/designer')
    ) {
      title = screenName;
    } else if (pathname.startsWith('/model')) {
      title = '大屏模板';
    } else if (pathname === '/screen') {
      title = '大屏列表';
    }
    document.title = title;
  };

  const dom = useMemo(() => {
    return <Component {...nextProps} />;
  }, [nextProps]);

  useEffect(() => {
    reload();
  }, [screenName, pathname]);

  return dom;
};

export default DocumentTitleSetWrapper;
