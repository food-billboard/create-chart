import {
  DEFAULT_SCREEN_COVER as defaultScreenCover,
  MOCK_REQUEST_URL as DEFAULT_MOCK_REQUEST_URL,
  SERVICE_REQUEST_URL,
} from '../../constants';

const isStatic = process.env.REACT_APP === 'static';
const isImportBackend = process.env.REACT_APP === 'improve_prod';

class GlobalConfig {
  // ? 1.22
  // 是否为优化分支版本
  // 优化分支版本是存在后端优化的版本，当中会有一些特殊的接口啥的配置
  IS_IMPROVE_BACKEND = isImportBackend;

  // 是否是简易前端版本
  IS_STATIC = isStatic;

  // 条件的最大个数
  CONDITION_COUNTER = 4;

  // 默认组件系列的最大个数
  DEFAULT_CHART_SERIES_COUNTER = 8;

  // 组件系列的最大个数
  CHART_SERIES_COUNTER: {
    [K in ComponentData.TComponentSelfType]?: number;
  } = {
    POLAR_BAR: 10,
    POLAR_STACK_BAR: 10,
    RANK_BAR: 10,
    BOX_PLOT_BASIC: 4,
    FUNNEL_BASIC: 12,
    SCATTER_BASIC: 4,
    TREE_BASIC: -1,
    TAG: 30,
    LIST: 10,
    STATE_CARD: 10,
    STATE_LIST: 20,
    LUCKY_DRAW: 20,
  };

  // 是否开启 mock数据配置
  ENABLE_MOCK_DATA_CONFIG = true;

  // mock数据请求的url地址
  MOCK_REQUEST_URL = DEFAULT_MOCK_REQUEST_URL;

  // 服务端请求的url地址
  SERVICE_SIDE_REQUEST_URL = SERVICE_REQUEST_URL;

  // 大屏的默认封面
  DEFAULT_SCREEN_COVER = defaultScreenCover;

  // 大屏的保存类型
  DEFAULT_SCREEN_SAVE_TYPE:
    | 'auto'
    | 'manual'
    | 'auto-all'
    | 'auto-all-storage' =
    isStatic || isImportBackend ? 'auto-all-storage' : 'auto';

  // 是否为自动保存类型
  isAutoSaveType() {
    return this.DEFAULT_SCREEN_SAVE_TYPE !== 'manual';
  }

  enableConfig = (
    settings: Partial<{
      DEFAULT_SCREEN_COVER: string;
      CONDITION_COUNTER: number;
      DEFAULT_CHART_SERIES_COUNTER: number;
      CHART_SERIES_COUNTER: {
        [K in ComponentData.TComponentSelfType]: number;
      };
      ENABLE_MOCK_DATA_CONFIG: boolean;
      DEFAULT_SCREEN_SAVE_TYPE: 'auto' | 'manual' | 'auto-all';
      MOCK_REQUEST_URL: string;
      SERVICE_SIDE_REQUEST_URL: string;
    }>,
  ) => {
    Object.entries(settings).forEach((setting) => {
      const [key, value] = setting;
      // @ts-ignore
      if (this[key]) this[key] = value;
    });
  };

  getChartSeriesCounter = (type: ComponentData.TComponentSelfType) => {
    return this.CHART_SERIES_COUNTER[type] ?? this.DEFAULT_CHART_SERIES_COUNTER;
  };
}

export default new GlobalConfig();
