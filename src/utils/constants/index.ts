export { default as DEFAULT_SCREEN_DATA } from './screenData';
export * from './another';
export * from './theme';
export * from './color';
export * from './component';

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
