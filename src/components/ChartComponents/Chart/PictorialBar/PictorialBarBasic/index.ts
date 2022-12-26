import { dynamic } from 'umi';

export default dynamic({
  loader: async function () {
    const defaultConfig = await import(
      /* webpackChunkName: "PICTORIAL_BAR_BASIC" */ './defaultConfig'
    );
    const themeConfig = defaultConfig.themeConfig;
    const configComponent = await import(
      /* webpackChunkName: "PICTORIAL_BAR_BASIC" */ './config'
    );
    const render = await import(
      /* webpackChunkName: "PICTORIAL_BAR_BASIC" */ './component'
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
