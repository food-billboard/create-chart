import { mergeWithoutArray } from '@/utils';
import {
  BASIC_DEFAULT_CONFIG,
  BASIC_DEFAULT_DATA_CONFIG,
  BASIC_DEFAULT_INTERACTIVE_CONFIG,
} from '../../Common/Constants/defaultConfig';
import ThemeUtil from '@/utils/Assist/Theme';
import ColorSelect from '@/components/ColorSelect';
import { TImageConfig } from './type';

const { getRgbaString } = ColorSelect;

const DEFAULT_COLOR = ThemeUtil.generateNextColor4CurrentTheme(0);

const DEFAULT_VALUE = {
  value: getRgbaString(DEFAULT_COLOR),
};

const CUSTOM_CONFIG: ComponentData.TInternalComponentConfig<TImageConfig> = {
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
          type: 'number',
        },
      ],
    },
  },
  options: {
    type: 'color',
    content: DEFAULT_COLOR,
    repeat: {
      x: false,
      y: false,
    },
  },
};

const DefaultConfig: ComponentData.TComponentData<TImageConfig> =
  mergeWithoutArray(
    {},
    {
      data: BASIC_DEFAULT_DATA_CONFIG,
      interactive: BASIC_DEFAULT_INTERACTIVE_CONFIG,
    },
    BASIC_DEFAULT_CONFIG,
    {
      style: {
        width: 300,
        height: 300,
      },
    },
    CUSTOM_CONFIG,
  );

export default DefaultConfig;
