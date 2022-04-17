import { mergeWithoutArray } from '@/utils';
import {
  BASIC_DEFAULT_CONFIG,
  BASIC_DEFAULT_DATA_CONFIG,
  BASIC_DEFAULT_INTERACTIVE_CONFIG,
  DEFAULT_FONT_CONFIG,
  DEFAULT_CONDITION_CONFIG,
} from '../../Common/Constants/defaultConfig';
import { TTitleConfig } from './type';

const DEFAULT_VALUE = {
  value: '我是一个标题',
};

const CUSTOM_CONFIG: ComponentData.TInternalComponentConfig<TTitleConfig> = {
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
          },
        ],
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
          description: '数据值',
          id: 'value',
          type: 'string',
        },
      ],
    },
  },
  options: {
    condition: [DEFAULT_CONDITION_CONFIG()],
    textStyle: {
      ...DEFAULT_FONT_CONFIG,
      fontSize: 24,
    },
    align: {
      vertical: 'center',
      horizontal: 'center',
    },
    orient: 'lr',
    animation: {
      show: false,
      value: 'animate__bounce',
      speed: 'animate__slow',
      repeat: 'animate__infinite',
      delay: 'animate__delay-2s',
    },
  },
};

const DefaultConfig: ComponentData.TComponentData<TTitleConfig> =
  mergeWithoutArray(
    {},
    {
      data: BASIC_DEFAULT_DATA_CONFIG,
      interactive: BASIC_DEFAULT_INTERACTIVE_CONFIG,
    },
    BASIC_DEFAULT_CONFIG,
    {
      style: {
        width: 180,
        height: 40,
      },
    },
    CUSTOM_CONFIG,
  );

export default DefaultConfig;
