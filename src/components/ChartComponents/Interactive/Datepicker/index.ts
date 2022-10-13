import defaultConfig, { themeConfig } from './defaultConfig';
import Component from './component';
import Config from './config';

export default {
  defaultConfig,
  themeConfig,
  configComponent: Config,
  render: Component,
  type: Component.id,
};
