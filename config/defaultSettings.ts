import { Settings as ProSettings } from '@ant-design/pro-layout';

export type DefaultSettings = ProSettings & {
  pwa: boolean;
};

const proSettings: DefaultSettings = {
  navTheme: 'light',
  // 拂晓蓝
  // primaryColor: '#1890ff',
  layout: 'mix',
  contentWidth: 'Fluid',
  fixedHeader: false,
  fixSiderbar: true,
  colorWeak: false,
  menu: {
    locale: true,
  },
  title: '数据可视化大屏',
  pwa: false,
  iconfontUrl: '',
};

export default proSettings;
