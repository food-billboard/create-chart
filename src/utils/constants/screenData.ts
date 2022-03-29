import { nanoid } from 'nanoid';

export const DEFAULT_FILTER_LIST: ComponentData.TFilterConfig[] = [
  {
    id: nanoid(),
    name: '取前几项',
    code: `
      // 起始的索引
      const start = 0 
      // 结束的索引
      const end = 10
      return data.slice(start, end)
    `,
    editable: false,
    params: [],
  },
  {
    id: nanoid(),
    name: '排序(小 -> 大)',
    code: `
      // 排序的字段
      const sortKey = 'x'

      return data.sort((a, b) => {
        return a[sortKey] - b[sortKey]
      })
    `,
    editable: false,
    params: [],
  },
  {
    id: nanoid(),
    name: '排序(大 -> 小)',
    code: `
      // 排序的字段
      const sortKey = 'x'

      return data.sort((a, b) => {
        return b[sortKey] - a[sortKey]
      })
    `,
    editable: false,
    params: [],
  },
];

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
      filter: DEFAULT_FILTER_LIST,
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
