import moment from 'moment';
import 'pathseg';
import 'moment/locale/zh-cn';
import 'animate.css';
import ThemeUtil from './utils/Assist/Theme';
import GlobalConfig from './utils/Assist/GlobalConfig';

moment.locale('zh-cn');

// 色调初始化
ThemeUtil.init();

// 设置全局初始化配置
GlobalConfig.enableConfig({});

export const locale = {
  default: 'zh-CN',
};

export const dva = {
  config: {
    onError(error: any) {
      console.error(error);
    },
  },
};

export const render = (nextRender: any) => {
  nextRender();
};
