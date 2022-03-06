import moment from 'moment';
import 'moment/locale/zh-cn';
import ThemeUtil from './utils/Assist/Theme';

moment.locale('zh-cn');

ThemeUtil.init();

export const locale = {
  default: 'zh-CN',
};

export const render = (nextRender: any) => {
  nextRender();
};
