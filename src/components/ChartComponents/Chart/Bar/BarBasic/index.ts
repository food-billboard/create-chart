import defaultConfig from './defaultConfig';
import BarBasic from './component';
import Config from './config';

export default {
  defaultConfig,
  configComponent: Config,
  render: BarBasic,
  type: BarBasic.id,
};
