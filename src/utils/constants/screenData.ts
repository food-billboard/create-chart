const DEFAULT_SCREEN_DATA: ComponentData.TScreenData = {
  name: '这是一个大屏呀',
  description: '',
  components: [],
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
      filter: [
        {
          id: '1',
          name: '随便谢谢的名字',
          code: 'var a = 100; a = 100; a = 1000;',
          editable: false,
          params: [],
        },
        {
          id: '2',
          name: '随便谢谢的名字二号',
          code: 'var a = 101',
          editable: false,
          params: [],
        },
      ],
      params: [],
      constants: [],
    },
    flag: {
      type: 'WEB',
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
