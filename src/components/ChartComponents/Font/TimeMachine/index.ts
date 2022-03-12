import defaultConfig from './defaultConfig';
import Component from './component';
import Config from './config';

export default {
  defaultConfig,
  configComponent: Config,
  render: Component,
  type: Component.id,
};
