import GlobalConfig from '@/utils/Assist/GlobalConfig';
import ThemeUtil from '@/utils/Assist/Theme';
import { useEffect } from 'react';

// 初始化状态相关
const InitialConfigWrapper = (props: any) => {
  const { Component, ...nextProps } = props;
  useEffect(() => {
    // 色调初始化
    ThemeUtil.init();

    // 设置全局初始化配置
    GlobalConfig.enableConfig({});
  }, []);

  return <Component {...nextProps} />;
};

export default InitialConfigWrapper;
