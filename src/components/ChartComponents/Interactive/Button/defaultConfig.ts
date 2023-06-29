import { mergeWithoutArray } from '@/utils';
import {
  BASIC_DEFAULT_CONFIG,
  BASIC_DEFAULT_DATA_CONFIG,
  BASIC_DEFAULT_INTERACTIVE_CONFIG,
  DEFAULT_FONT_CONFIG,
  DEFAULT_LINKAGE_CONFIG,
  DEFAULT_CONDITION_CONFIG,
  DEFAULT_BORDER_RADIUS,
  DEFAULT_INTERACTIVE_BASE_CONFIG,
} from '../../Common/Constants/defaultConfig';
import ThemeUtil from '@/utils/Assist/Theme';
import { TButtonConfig } from './type';

const DEFAULT_VALUE = {
  loading: false,
  value: '我是一个按钮',
  disabled: false,
};

export default () => {
  const CUSTOM_CONFIG: ComponentData.TInternalComponentConfig<TButtonConfig> = {
    interactive: {
      base: [
        {
          ...DEFAULT_INTERACTIVE_BASE_CONFIG,
          type: 'click',
          name: '当点击按钮时',
          fields: [
            {
              key: 'value',
              variable: '',
              description: '按钮内容',
            },
          ],
        },
      ],
      linkage: [
        {
          ...DEFAULT_LINKAGE_CONFIG,
          type: 'click',
          name: '点击',
        },
      ],
    },
    data: {
      request: {
        value: DEFAULT_VALUE,
        valueType: 'object',
      },
      filter: {
        map: [
          {
            field: 'value',
            map: '',
            description: '按钮文字',
            id: 'value',
            type: 'string',
          },
          {
            field: 'loading',
            map: '',
            description: '加载',
            id: 'loading',
            type: 'boolean',
          },
          {
            field: 'disabled',
            map: '',
            description: '是否禁用',
            id: 'disabled',
            type: 'boolean',
          },
        ],
      },
    },
    options: {
      condition: DEFAULT_CONDITION_CONFIG(),
      backgroundColor: ThemeUtil.generateNextColor4CurrentTheme(0),
      icon: 'bi-star-fill',
      type: 'primary',
      actionType: 'normal',
      textStyle: {
        ...DEFAULT_FONT_CONFIG,
      },
      borderRadius: DEFAULT_BORDER_RADIUS,
    },
  };

  const DefaultConfig: ComponentData.TComponentData<TButtonConfig> =
    mergeWithoutArray(
      {},
      {
        data: BASIC_DEFAULT_DATA_CONFIG,
        interactive: BASIC_DEFAULT_INTERACTIVE_CONFIG,
      },
      BASIC_DEFAULT_CONFIG,
      {
        style: {
          width: 150,
          height: 60,
        },
      },
      CUSTOM_CONFIG,
    );

  return DefaultConfig;
};

export const themeConfig = {
  convert: (colorList: string[]) => {
    return {
      backgroundColor: ThemeUtil.generateNextColor4CurrentTheme(0),
    };
  },
};
