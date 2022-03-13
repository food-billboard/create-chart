import { mergeWithoutArray } from '@/utils';
import {
  BASIC_DEFAULT_CONFIG,
  BASIC_DEFAULT_DATA_CONFIG,
  BASIC_DEFAULT_INTERACTIVE_CONFIG,
  DEFAULT_FONT_CONFIG,
} from '../../Common/Constants/defaultConfig';
import { getName } from '@/utils/constants';
import ThemeUtil from '@/utils/Assist/Theme';
import { TSelectConfig } from './type';

const DEFAULT_NAME_LABEL = getName(3);

const DEFAULT_VALUE = DEFAULT_NAME_LABEL.map((item) => ({
  name: item,
  value: item,
}));

const CUSTOM_CONFIG: ComponentData.TInternalComponentConfig<TSelectConfig> = {
  interactive: {
    base: [
      {
        type: 'select',
        name: '当选中项时',
        show: false,
        fields: [
          {
            key: 'value',
            variable: '',
            description: '数据值',
          },
          {
            key: 'name',
            variable: '',
            description: '数据名',
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
    base: {
      textStyle: {
        ...DEFAULT_FONT_CONFIG,
        fontSize: 24,
      },
      backgroundColor: {
        r: 0,
        g: 0,
        b: 0,
      },
      border: {
        type: 'solid',
        width: 1,
        color: {
          r: 255,
          g: 255,
          b: 255,
        },
      },
    },
    active: {
      textStyle: {
        ...DEFAULT_FONT_CONFIG,
        color: ThemeUtil.generateNextColor4CurrentTheme(0),
        fontSize: 24,
        fontWeight: 'bold',
      },
      backgroundColor: {
        r: 0,
        g: 0,
        b: 0,
      },
      border: {
        type: 'solid',
        width: 1,
        color: ThemeUtil.generateNextColor4CurrentTheme(0),
      },
    },
  },
};

const DefaultConfig: ComponentData.TComponentData<TSelectConfig> =
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
        height: 60,
      },
    },
    CUSTOM_CONFIG,
  );

export default DefaultConfig;
