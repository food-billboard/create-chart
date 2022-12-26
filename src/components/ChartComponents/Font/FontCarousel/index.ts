import { dynamic } from 'umi';

export default dynamic({
  loader: async function () {
    const defaultConfig = await import(
      /* webpackChunkName: "FONT_CAROUSEL" */ './defaultConfig'
    );
    const themeConfig = defaultConfig.themeConfig;
    const configComponent = await import(
      /* webpackChunkName: "FONT_CAROUSEL" */ './config'
    );
    const render = await import(
      /* webpackChunkName: "FONT_CAROUSEL" */ './component'
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
