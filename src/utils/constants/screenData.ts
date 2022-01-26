const DEFAULT_SCREEN_DATA: ComponentData.TScreenData = {
  name: '这是一个大屏呀',
  description: '',
  components: [
    {
      description: '这是一个柱形图',
      name: '柱形图1',
      id: '1',
      type: 'COMPONENT',
      componentType: 'BAR_BASIC',
      components: [],
      icon: 'https://t11.baidu.com/it/u=3568834696,3961759073&fm=58',
      config: {
        style: {
          width: 200,
          height: 100,
          left: 20,
          top: 20,
          opacity: 1,
          rotate: 0,
          zIndex: 2,
        },
        attr: {
          visible: true,
          lock: false,
        },
        interactive: {
          base: [],
        },
        data: {
          request: {
            url: '',
            method: 'POST',
            headers: {},
            body: {},
            frequency: {
              show: false,
              value: 10,
            },
            type: 'static',
            value: [],
          },
          filter: {
            show: false,
            fields: [
              {
                name: 'x',
                description: 'x轴',
              },
              {
                name: 'y',
                description: 'y轴',
              },
              {
                name: 's',
                description: '系列',
              },
            ],
            value: [],
            map: [],
          },
        },
        options: {},
      },
    },
    {
      description: '这是一个柱形图',
      name: '柱形图2',
      id: '2',
      type: 'COMPONENT',
      componentType: 'BAR_BASIC',
      icon: 'https://t11.baidu.com/it/u=3568834696,3961759073&fm=58',
      components: [],
      config: {
        style: {
          width: 400,
          height: 300,
          left: 100,
          top: 100,
          opacity: 1,
          rotate: 0,
          zIndex: 2,
        },
        attr: {
          visible: true,
          lock: false,
        },
        interactive: {
          base: [],
        },
        data: {
          request: {
            url: '',
            method: 'POST',
            headers: {},
            body: {},
            frequency: {
              show: false,
              value: 10,
            },
            type: 'static',
            value: [],
          },
          filter: {
            show: false,
            fields: [
              {
                name: 'x',
                description: 'x轴',
              },
              {
                name: 'y',
                description: 'y轴',
              },
              {
                name: 's',
                description: '系列',
              },
            ],
            value: [],
            map: [],
          },
        },
        options: {},
      },
    },
    {
      description: '这是一个柱形图',
      name: '组1-3',
      id: '3',
      type: 'GROUP_COMPONENT',
      componentType: 'GROUP_COMPONENT',
      components: [
        {
          description: '这是一个柱形图',
          name: '组1-柱形图-4',
          id: '4',
          type: 'COMPONENT',
          icon: 'https://t11.baidu.com/it/u=3568834696,3961759073&fm=58',
          parent: '3',
          componentType: 'BAR_BASIC',
          components: [],
          config: {
            style: {
              width: 400,
              height: 300,
              left: 100,
              top: 100,
              opacity: 1,
              rotate: 0,
              zIndex: 2,
            },
            attr: {
              visible: true,
              lock: false,
            },
            interactive: {
              base: [],
            },
            data: {
              request: {
                url: '',
                method: 'POST',
                headers: {},
                body: {},
                frequency: {
                  show: false,
                  value: 10,
                },
                type: 'static',
                value: [],
              },
              filter: {
                show: false,
                fields: [
                  {
                    name: 'x',
                    description: 'x轴',
                  },
                  {
                    name: 'y',
                    description: 'y轴',
                  },
                  {
                    name: 's',
                    description: '系列',
                  },
                ],
                value: [],
                map: [],
              },
            },
            options: {},
          },
        },
      ],
      config: {
        style: {
          width: 200,
          height: 100,
          left: 200,
          top: 200,
          opacity: 1,
          rotate: 0,
          zIndex: 2,
        },
        attr: {
          visible: true,
          lock: false,
        },
        options: {},
      },
    },
    {
      description: '这是一个柱形图',
      name: '组2-5',
      id: '5',
      type: 'GROUP_COMPONENT',
      componentType: 'GROUP_COMPONENT',
      components: [
        {
          description: '这是一个柱形图',
          name: '组2-组1-6',
          id: '6',
          type: 'GROUP_COMPONENT',
          componentType: 'GROUP_COMPONENT',
          parent: '5',
          components: [
            {
              description: '这是一个柱形图',
              name: '组2-组1-柱形图1-7',
              id: '7',
              parent: '6',
              type: 'COMPONENT',
              componentType: 'BAR_BASIC',
              icon: 'https://t11.baidu.com/it/u=3568834696,3961759073&fm=58',
              components: [],
              config: {
                style: {
                  width: 400,
                  height: 300,
                  left: 100,
                  top: 100,
                  opacity: 1,
                  rotate: 0,
                  zIndex: 2,
                },
                attr: {
                  visible: true,
                  lock: false,
                },
                interactive: {
                  base: [],
                },
                data: {
                  request: {
                    url: '',
                    method: 'POST',
                    headers: {},
                    body: {},
                    frequency: {
                      show: false,
                      value: 10,
                    },
                    type: 'static',
                    value: [],
                  },
                  filter: {
                    show: false,
                    fields: [
                      {
                        name: 'x',
                        description: 'x轴',
                      },
                      {
                        name: 'y',
                        description: 'y轴',
                      },
                      {
                        name: 's',
                        description: '系列',
                      },
                    ],
                    value: [],
                    map: [],
                  },
                },
                options: {},
              },
            },
          ],
          config: {
            style: {
              width: 200,
              height: 100,
              left: 200,
              top: 200,
              opacity: 1,
              rotate: 0,
              zIndex: 2,
            },
            attr: {
              visible: true,
              lock: false,
            },
            options: {},
          },
        },
        {
          description: '这是一个柱形图',
          name: '组2-组2-8',
          id: '8',
          type: 'GROUP_COMPONENT',
          componentType: 'GROUP_COMPONENT',
          parent: '5',
          components: [
            {
              description: '这是一个柱形图',
              name: '组2-组2-柱形图1-8',
              id: '9',
              parent: '8',
              type: 'COMPONENT',
              componentType: 'BAR_BASIC',
              icon: 'https://t11.baidu.com/it/u=3568834696,3961759073&fm=58',
              components: [],
              config: {
                style: {
                  width: 400,
                  height: 300,
                  left: 100,
                  top: 100,
                  opacity: 1,
                  rotate: 0,
                  zIndex: 2,
                },
                attr: {
                  visible: true,
                  lock: false,
                },
                interactive: {
                  base: [],
                },
                data: {
                  request: {
                    url: '',
                    method: 'POST',
                    headers: {},
                    body: {},
                    frequency: {
                      show: false,
                      value: 10,
                    },
                    type: 'static',
                    value: [],
                  },
                  filter: {
                    show: false,
                    fields: [
                      {
                        name: 'x',
                        description: 'x轴',
                      },
                      {
                        name: 'y',
                        description: 'y轴',
                      },
                      {
                        name: 's',
                        description: '系列',
                      },
                    ],
                    value: [],
                    map: [],
                  },
                },
                options: {},
              },
            },
          ],
          config: {
            style: {
              width: 200,
              height: 100,
              left: 200,
              top: 200,
              opacity: 1,
              rotate: 0,
              zIndex: 2,
            },
            attr: {
              visible: true,
              lock: false,
            },
            options: {},
          },
        },
      ],
      config: {
        style: {
          width: 200,
          height: 100,
          left: 200,
          top: 200,
          opacity: 1,
          rotate: 0,
          zIndex: 2,
        },
        attr: {
          visible: true,
          lock: false,
        },
        options: {},
      },
    },
  ],
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
