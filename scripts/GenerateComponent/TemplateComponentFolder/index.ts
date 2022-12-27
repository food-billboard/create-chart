import defaultConfig, { themeConfig } from './defaultConfig';
import LazyLoadWrapper from '@/components/LazyLoad';
import { CHART_ID } from './id'

export default {
  defaultConfig,
  themeConfig,
  configComponent: LazyLoadWrapper(() => {
    return import(/* webpackChunkName: "{{COMPONENT_TYPE}}" */ './config')
  }),
  render: LazyLoadWrapper(() => {
    return import(/* webpackChunkName: "{{COMPONENT_TYPE}}" */ './component')
  }),
  type: CHART_ID,
};
