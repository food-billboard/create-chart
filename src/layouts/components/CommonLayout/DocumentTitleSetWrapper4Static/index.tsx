import { useEffect, useMemo } from 'react';
import { useLocation } from 'umi';

// 设置document title
const DocumentTitleSetWrapper = (props: any) => {
  const { screenName, Component, ...nextProps } = props;
  const { pathname } = useLocation();

  const reload = () => {
    let title = screenName || '大屏设计器';
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
