import LazyLoadWrapper from '@/components/LazyLoad';
import defaultConfig, { themeConfig } from './defaultConfig';
import { CHART_ID } from './id';

export default {
  defaultConfig,
  themeConfig,
  configComponent: LazyLoadWrapper(() => {
    return import(/* webpackChunkName: "GAUGE_BASIC" */ './config');
  }),
  render: LazyLoadWrapper(() => {
    return import(/* webpackChunkName: "GAUGE_BASIC" */ './component');
  }),
  type: CHART_ID,
};
