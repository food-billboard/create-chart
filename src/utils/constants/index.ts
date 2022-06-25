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
  left: 70,
  top: 70,
};

export const ECHARTS_URL = 'https://echarts.apache.org/zh/index.html';

export const SCREEN_VERSION = version;
export const SCREEN_MODEL_VERSION = version;

// mock 数据请求的后端地址
export const MOCK_REQUEST_URL = '/api/screen/mock';
