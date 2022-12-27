import defaultConfig, { themeConfig } from './defaultConfig';
// import Component from './component';
// import Config from './config';
import LazyLoadWrapper from '@/components/LazyLoad';
import { CHART_ID } from './id';

export default {
  defaultConfig,
  themeConfig,
  configComponent: LazyLoadWrapper(() => {
    return import(/* webpackChunkName: "BAR_BASIC" */ './config');
  }),
  render: LazyLoadWrapper(() => {
    return import(/* webpackChunkName: "BAR_BASIC" */ './component');
  }),
  type: CHART_ID,
};

// export default dynamic({
//   loader: async function () {
//     const defaultConfig = await import(
//       /* webpackChunkName: "BAR_BASIC" */ './defaultConfig'
//     );
//     const themeConfig = defaultConfig.themeConfig;
//     const configComponent = await import(
//       /* webpackChunkName: "BAR_BASIC" */ './config'
//     );
//     const render = await import(
//       /* webpackChunkName: "BAR_BASIC" */ './component'
//     );
//     const type = render.default.id;
//     return {
//       defaultConfig,
//       themeConfig,
//       configComponent,
//       render,
//       type,
//     };
//   },
// });
