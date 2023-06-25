import { random } from 'lodash';
import { mergeWithoutArray } from '@/utils';
import {
  BASIC_DEFAULT_CONFIG,
  BASIC_DEFAULT_DATA_CONFIG,
  BASIC_DEFAULT_INTERACTIVE_CONFIG,
  DEFAULT_FONT_CONFIG,
  DEFAULT_CONDITION_CONFIG,
  DEFAULT_LINKAGE_CONFIG,
  DEFAULT_INTERACTIVE_BASE_CONFIG,
} from '../../Common/Constants/defaultConfig';
import ThemeUtil from '@/utils/Assist/Theme';
import { TListConfig } from './type';

const DEFAULT_VALUE = new Array(20)
  .fill({
    name: 'daniel',
    age: 25,
    job: 'front-end developer',
  })
  .map((item) => {
    return {
      ...item,
      mark: random(-100, 100, false),
    };
  });

export default () => {
  const DEFAULT_HEADER = {
    backgroundColor: ThemeUtil.generateNextColor4CurrentTheme(0),
    textStyle: {
      ...DEFAULT_FONT_CONFIG,
      fontWeight: 'bolder',
    },
  };
  const CUSTOM_CONFIG: ComponentData.TInternalComponentConfig<TListConfig> = {
    interactive: {
      base: [
        {
          ...DEFAULT_INTERACTIVE_BASE_CONFIG,
          type: 'click-item',
          name: '当点击项时',
          fields: [
            {
              key: 'name',
              variable: '',
              description: '数据名',
            },
            {
              key: 'value',
              variable: '',
              description: '数据值',
            },
          ],
        },
        {
          ...DEFAULT_INTERACTIVE_BASE_CONFIG,
          type: 'click-column',
          name: '当点击行时',
          fields: [
            {
              key: 'value',
              variable: '',
              description: '数据值',
            },
          ],
        },
      ],
      linkage: [
        {
          ...DEFAULT_LINKAGE_CONFIG,
          type: 'click-item',
          name: '点击项',
        },
        {
          ...DEFAULT_LINKAGE_CONFIG,
          type: 'click-column',
          name: '点击行',
        },
      ],
    },
    data: {
      request: {
        value: DEFAULT_VALUE,
      },
      filter: {
        map: [
          {
            field: 'name',
            map: '',
            description: '姓名',
            id: 'name',
            type: 'string',
          },
          {
            field: 'age',
            map: '',
            description: '年龄',
            id: 'age',
            type: 'number',
          },
          {
            field: 'job',
            map: '',
            description: '工作',
            id: 'job',
            type: 'string',
          },
          {
            field: 'mark',
            map: '',
            description: '评分',
            id: 'mark',
            type: 'number',
          },
        ],
      },
    },
    options: {
      condition: DEFAULT_CONDITION_CONFIG(),
      global: {
        animation: {
          show: true,
          type: 'column',
          speed: 2000,
          autoplaySpeed: 3000,
        },
        column: 10,
      },
      header: {
        show: true,
        height: 60,
        ...DEFAULT_HEADER,
      },
      index: {
        show: true,
        backgroundColor: {
          r: 255,
          g: 255,
          b: 255,
          a: 0,
        },
        size: 20,
        width: 5,
        radius: 50,
        textStyle: {
          ...DEFAULT_FONT_CONFIG,
          fontWeight: 'bold',
        },
      },
      columns: {
        margin: 0,
        even: {
          backgroundColor: {
            ...ThemeUtil.generateNextColor4CurrentTheme(0),
            a: 0.4,
          },
        },
        odd: {
          backgroundColor: {
            ...ThemeUtil.generateNextColor4CurrentTheme(0),
            a: 0.6,
          },
        },
        data: [
          {
            key: 'name',
            name: '姓名',
            width: 20,
            type: 'text',
            textStyle: {
              ...DEFAULT_FONT_CONFIG,
              textAlign: 'center',
            },
            header: {
              show: true,
            },
            scroll: {
              show: false,
            },
          },
          {
            key: 'age',
            name: '年龄',
            width: 20,
            type: 'text',
            textStyle: {
              ...DEFAULT_FONT_CONFIG,
              textAlign: 'center',
            },
            header: {
              show: true,
            },
            scroll: {
              show: false,
            },
          },
          {
            key: 'job',
            name: '工作',
            width: 35,
            type: 'text',
            textStyle: {
              ...DEFAULT_FONT_CONFIG,
              textAlign: 'center',
            },
            header: {
              show: true,
            },
            scroll: {
              show: false,
            },
          },
          {
            key: 'mark',
            name: '评分',
            width: 20,
            type: 'number-point',
            textStyle: {
              ...DEFAULT_FONT_CONFIG,
              textAlign: 'center',
            },
            header: {
              show: true,
            },
            scroll: {
              show: false,
            },
          },
        ],
      },
    },
  };

  const DefaultConfig: ComponentData.TComponentData<TListConfig> =
    mergeWithoutArray(
      {},
      {
        data: BASIC_DEFAULT_DATA_CONFIG,
        interactive: BASIC_DEFAULT_INTERACTIVE_CONFIG,
      },
      BASIC_DEFAULT_CONFIG,
      {
        style: {
          width: 400,
          height: 600,
        },
      },
      CUSTOM_CONFIG,
    );

  return DefaultConfig;
};

export const themeConfig = {
  convert: (colorList: string[], options: TListConfig) => {
    return {
      header: {
        backgroundColor: ThemeUtil.generateNextColor4CurrentTheme(0),
      },
      columns: {
        even: {
          backgroundColor: {
            ...ThemeUtil.generateNextColor4CurrentTheme(0),
            a: options.columns.even.backgroundColor.a,
          },
        },
        odd: {
          backgroundColor: {
            ...ThemeUtil.generateNextColor4CurrentTheme(0),
            a: options.columns.odd.backgroundColor.a,
          },
        },
      },
    };
  },
};
