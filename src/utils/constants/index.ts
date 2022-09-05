import { version } from '../../../package.json';

export { default as DEFAULT_SCREEN_DATA } from './screenData';
export * from './another';
export * from './theme';
export * from './color';
export * from './component';
export * from './data';
export * from './defaultValue';

export enum EComponentType {
  GROUP_COMPONENT = 'GROUP_COMPONENT',
  COMPONENT = 'COMPONENT',
}

export enum EComponentSelfType {
  GROUP_COMPONENT = 'GROUP_COMPONENT',
  BAR_BASIC = 'BAR_BASIC',
  BAR_LINE = 'BAR_LINE',
  LINE_BASIC = 'LINE_BASIC',
  LINE_WATERFALL = 'LINE_WATERFALL',
}

export const PANEL_ABSOLUTE_POSITION = {
  left: 30,
  top: 30,
};

export const ECHARTS_URL = 'https://echarts.apache.org/zh/index.html';

export const SCREEN_VERSION = version;
export const SCREEN_MODEL_VERSION = version;

// mock 数据请求的后端地址
export const MOCK_REQUEST_URL = '/api/screen/mock';

// 服务端请求的后端地址
export const SERVICE_REQUEST_URL = '/api/screen/pre/request';

// 数据请求超时时间
export const REQUEST_TIMEOUT = 10000;

// 默认的大屏封面
export const DEFAULT_SCREEN_COVER =
  'http://47.97.27.23/static/image/1214adef02e38de1d9a02e5fa27af229.png';

// 3d model 展示的url地址
export const DEFAULT_THREE_D_MODEL_URL = 'http://localhost:5001';
