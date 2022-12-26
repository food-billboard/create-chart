// import defaultConfig, { themeConfig } from './defaultConfig';
// import Component from './component';
// import Config from './config';
import { dynamic } from 'umi';

// export default {
//   defaultConfig,
//   themeConfig,
//   configComponent: Config,
//   render: Component,
//   type: Component.id,
// };

export default dynamic({
  loader: async function () {
    const defaultConfig = await import(
      /* webpackChunkName: "BAR_BASIC" */ './defaultConfig'
    );
    const themeConfig = defaultConfig.themeConfig;
    const configComponent = await import(
      /* webpackChunkName: "BAR_BASIC" */ './config'
    );
    const render = await import(
      /* webpackChunkName: "BAR_BASIC" */ './component'
    );
    const type = render.default.id;
    return {
      defaultConfig,
      themeConfig,
      configComponent,
      render,
      type,
    };
  },
});
