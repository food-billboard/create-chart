/* eslint-disable @typescript-eslint/camelcase */
// @ts-ignore
import dark from 'antd/dist/dark-theme';

export default {
  hack_less: `true;@import "${require.resolve(
    'antd/lib/style/color/colorPalette.less',
  )}";`,
  ...dark,
  '@light': '#fff',
  '@tabs-horizontal-padding': '12px 0',

  // zIndex': 'notification > popover > tooltip
  '@zindex-notification': '1063',
  '@zindex-popover': '1061',
  '@zindex-tooltip': '1060',

  // width
  '@anchor-border-width': '1px',

  // margin
  '@form-item-margin-bottom': '24px',
  '@menu-item-vertical-margin': '0px',
  '@menu-item-boundary-margin': '0px',

  // size
  '@font-size-base': '14px',
  '@font-size-lg': '16px',
  '@screen-xl': '1208px',
  '@screen-lg': '1024px',
  '@screen-md': '768px',

  // 移动
  '@screen-sm': '767.9px',
  // 超小屏
  '@screen-xs': '375px',

  // 官网
  '@site-text-color': '@text-color',
  '@site-border-color-split': 'fade(@light, 5)',
  '@site-heading-color': '@heading-color',
  '@site-header-box-shadow':
    '0 0.3px 0.9px rgba(0, 0, 0, 0.12), 0 1.6px 3.6px rgba(0, 0, 0, 0.12)',
  '@home-text-color': '@text-color',

  //自定义需要找设计师
  '@gray-8': '@text-color',
  '@background-color-base': '#555',
  '@skeleton-color': 'rgba(0,0,0,0.8)',

  // pro
  '@pro-header-box-shadow': '@site-header-box-shadow',
};
