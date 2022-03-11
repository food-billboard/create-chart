import { mergeWithoutArray } from '@/utils';
import {
  BASIC_DEFAULT_CONFIG,
  BASIC_DEFAULT_DATA_CONFIG,
  BASIC_DEFAULT_INTERACTIVE_CONFIG,
  DEFAULT_FONT_CONFIG,
} from '../../Common/Constants/defaultConfig';
import { getText } from '@/utils/constants';
import { TTitleConfig } from './type';

const [DEFAULT_NAME_LABEL] = getText(1);

const DEFAULT_VALUE = {
  value: DEFAULT_NAME_LABEL,
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
    },
    filter: {
      map: [
        {
          field: 'value',
          map: '',
          description: '数据值',
          id: 'value',
          type: 'number',
        },
      ],
    },
  },
  options: {
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
        width: 100,
        height: 40,
      },
    },
    CUSTOM_CONFIG,
  );

export default DefaultConfig;
