const DEFAULT_SCREEN_DATA: ComponentData.TScreenData = {
  name: '大屏名称',
  description: '',
  components: [],
  poster: '',
  config: {
    style: {
      width: 1920,
      height: 1080,
    },
    attr: {
      poster: {
        type: 'color',
        color: {
          r: 5,
          g: 46,
          b: 36,
        },
      },
      filter: [],
      params: [],
      constants: [],
    },
    flag: {
      type: 'PC',
    },
  },
};

export default DEFAULT_SCREEN_DATA;

export const DEFAULT_CONFIG: ComponentData.TBaseConfig = {
  style: {
    width: 200,
    height: 200,
    left: 0,
    top: 0,
    opacity: 1,
    rotate: 0,
    zIndex: 2,
  },
  attr: {
    visible: true,
    lock: false,
  },
};
