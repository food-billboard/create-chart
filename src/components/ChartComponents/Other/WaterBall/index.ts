import LazyLoadWrapper from '@/components/LazyLoad';
import defaultConfig, { themeConfig } from './defaultConfig';
import { CHART_ID } from './id';

export default {
  defaultConfig,
  themeConfig,
  configComponent: LazyLoadWrapper(() => {
    return import(/* webpackChunkName: "WATER_BALL" */ './config');
  }),
  render: LazyLoadWrapper(() => {
    return import(/* webpackChunkName: "WATER_BALL" */ './component');
  }),
  type: CHART_ID,
};
