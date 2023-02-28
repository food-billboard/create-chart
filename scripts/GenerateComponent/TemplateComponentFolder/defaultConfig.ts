import { mergeWithoutArray } from '@/utils';
import {
  BASIC_DEFAULT_CONFIG,
  BASIC_DEFAULT_DATA_CONFIG,
  BASIC_DEFAULT_INTERACTIVE_CONFIG,
  DEFAULT_FONT_CONFIG,
  DEFAULT_CONDITION_CONFIG,
  DEFAULT_LINKAGE_CONFIG,
  DEFAULT_THEME_COLOR_LIST
} from '@/utils/constants/defaultComponentConfig';
import { T{{COMPONENT_NAME}}Config } from './type';

const DEFAULT_VALUE = {
  value: "这个是组件的默认数据配置"
}

export default () => {
  const CUSTOM_CONFIG: ComponentData.TInternalComponentConfig<T{{COMPONENT_NAME}}Config> =
    {
      interactive: {
        base: [
          {
            type: 'click',
            name: '当点击项时',
            show: false,
            fields: [
              {
                key: 'value',
                variable: '',
                description: '数据值',
              }
            ],
          },
        ],
        linkage: [
          {
            ...DEFAULT_LINKAGE_CONFIG,
            type: 'click-item',
            name: '点击',
          },
        ],
      },
      data: {
        request: {
          value: DEFAULT_VALUE,
          valueType: 'object', // object | array
        },
        filter: {
          map: [
            {
              field: 'value',
              map: '',
              description: '数据值字段',
              id: 'value',
              type: 'string',
            }
          ],
        },
      },
      options: {
        textStyle: {
          ...DEFAULT_FONT_CONFIG,
        },
        content: "字符串配置",
        counter: 200,
        color: DEFAULT_THEME_COLOR_LIST()[0],
        condition: DEFAULT_CONDITION_CONFIG(),
      },
    };

  const DefaultConfig: ComponentData.TComponentData<T{{COMPONENT_NAME}}Config> =
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
          height: 400,
        },
      },
      CUSTOM_CONFIG,
    );
  return DefaultConfig;
};

export const themeConfig = {
  convert: (colorList: string[], options: T{{COMPONENT_NAME}}Config) => {
    // 为了能在大屏主题色修改时，将一些与主题色关联的配置进行快速更改
    // 在这里重置options配置里的一些颜色
    // 比如例子中的color
    return {
      color: DEFAULT_THEME_COLOR_LIST()[0]
    };
  },
};
