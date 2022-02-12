import moment from 'moment';
import 'perfect-scrollbar/css/perfect-scrollbar.css';
import 'moment/locale/zh-cn';

moment.locale('zh-cn');

export const locale = {
  default: 'zh-CN',
};

export const render = (nextRender: any) => {
  nextRender();
};
