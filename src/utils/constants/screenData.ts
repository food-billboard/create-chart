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
        background: '#999',
      },
      filter: [
        {
          id: '1',
          name: '随便谢谢的名字',
          code: 'var a = 100; a = 100; a = 1000;',
        },
        {
          id: '2',
          name: '随便谢谢的名字二号',
          code: 'var a = 101',
        },
      ],
    },
    flag: {
      type: 'WEB',
    },
  },
};

export default DEFAULT_SCREEN_DATA;
