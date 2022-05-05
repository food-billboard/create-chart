import { mergeWithoutArray } from '@/utils';
import {
  BASIC_DEFAULT_CONFIG,
  BASIC_DEFAULT_DATA_CONFIG,
  BASIC_DEFAULT_INTERACTIVE_CONFIG,
  DEFAULT_FONT_CONFIG,
} from '../../Common/Constants/defaultConfig';
import ThemeUtil from '@/utils/Assist/Theme';
import { TRadioConfig } from './type';

const DEFAULT_VALUE = [
  {
    name: '选项一',
    value: '0',
  },
  {
    name: '选项二',
    value: '1',
  },
  {
    name: '选项三',
    value: '2',
  },
];

export default () => {
  const CUSTOM_CONFIG: ComponentData.TInternalComponentConfig<TRadioConfig> = {
    interactive: {
      base: [
        {
          type: 'change',
          name: '当选中改变时',
          show: false,
          fields: [
            {
              key: 'value',
              variable: '',
              description: '选中值',
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
            field: 'name',
            map: '',
            description: '数据名',
            id: 'name',
            type: 'string',
          },
          {
            field: 'value',
            map: '',
            description: '数据值',
            id: 'value',
            type: 'string',
          },
        ],
      },
      disabled: true,
    },
    options: {
      borderColor: {
        r: 99,
        g: 99,
        b: 99,
      },
      defaultChecked: '',
      borderRadius: 4,
      backgroundColor: {
        r: 255,
        g: 255,
        b: 255,
        a: 0,
      },
      textStyle: {
        ...DEFAULT_FONT_CONFIG,
      },
      size: 28,
      active: {
        borderColor: ThemeUtil.generateNextColor4CurrentTheme(0),
        backgroundColor: ThemeUtil.generateNextColor4CurrentTheme(0),
      },
      check: {
        color: {
          r: 255,
          g: 255,
          b: 255,
        },
      },
    },
  };

  const DefaultConfig: ComponentData.TComponentData<TRadioConfig> =
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
          height: 80,
        },
      },
      CUSTOM_CONFIG,
    );

  return DefaultConfig;
};
