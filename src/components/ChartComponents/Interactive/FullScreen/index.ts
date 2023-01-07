import LazyLoadWrapper from '@/components/LazyLoad';
import defaultConfig, { themeConfig } from './defaultConfig';
import { CHART_ID } from './id';

export default {
  defaultConfig,
  themeConfig,
  configComponent: LazyLoadWrapper(() => {
    return import(/* webpackChunkName: "FULL_SCREEN" */ './config');
  }),
  render: LazyLoadWrapper(() => {
    return import(/* webpackChunkName: "FULL_SCREEN" */ './component');
  }),
  type: CHART_ID,
};
