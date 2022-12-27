import LazyLoadWrapper from '@/components/LazyLoad';
import defaultConfig, { themeConfig } from './defaultConfig';
import { CHART_ID } from './id';

export default {
  defaultConfig,
  themeConfig,
  configComponent: LazyLoadWrapper(() => {
    return import(/* webpackChunkName: "STATE_LIST" */ './config');
  }),
  render: LazyLoadWrapper(() => {
    return import(/* webpackChunkName: "STATE_LIST" */ './component');
  }),
  type: CHART_ID,
};
