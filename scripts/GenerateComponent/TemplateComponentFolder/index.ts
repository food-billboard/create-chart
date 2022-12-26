import { dynamic } from 'umi'

export default dynamic({
  loader: async function() {
    const defaultConfig = await import(/* webpackChunkName: "{{COMPONENT_TYPE}}" */ './defaultConfig')
    const themeConfig = defaultConfig.themeConfig
    const configComponent = await import(/* webpackChunkName: "{{COMPONENT_TYPE}}" */ './config')
    const render = await import(/* webpackChunkName: "{{COMPONENT_TYPE}}" */ './component')
    const type = render.default.id
    return {
      defaultConfig,
      themeConfig,
      configComponent,
      render,
      type
    }
  }
})
