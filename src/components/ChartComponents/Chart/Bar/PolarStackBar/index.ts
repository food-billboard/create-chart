import LazyLoadWrapper from '@/components/LazyLoad';
import defaultConfig, { themeConfig } from './defaultConfig';
import { CHART_ID } from './id';

export default {
  defaultConfig,
  themeConfig,
  configComponent: LazyLoadWrapper(() => {
    return import(/* webpackChunkName: "POLAR_STACK_BAR" */ './config');
  }),
  render: LazyLoadWrapper(() => {
    return import(/* webpackChunkName: "POLAR_STACK_BAR" */ './component');
  }),
  type: CHART_ID,
};
