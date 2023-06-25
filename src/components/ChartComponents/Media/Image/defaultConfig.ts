import { mergeWithoutArray } from '@/utils';
import {
  BASIC_DEFAULT_CONFIG,
  BASIC_DEFAULT_DATA_CONFIG,
  BASIC_DEFAULT_INTERACTIVE_CONFIG,
  DEFAULT_CONDITION_CONFIG,
  DEFAULT_LINKAGE_CONFIG,
  DEFAULT_INTERACTIVE_BASE_CONFIG,
} from '../../Common/Constants/defaultConfig';
import ThemeUtil from '@/utils/Assist/Theme';
import ColorSelect from '@/components/ColorSelect';
import { TImageConfig } from './type';

const { getRgbaString } = ColorSelect;

const DEFAULT_COLOR = ThemeUtil.generateNextColor4CurrentTheme(0);

const DEFAULT_VALUE = {
  value: getRgbaString(DEFAULT_COLOR),
};

export default () => {
  const CUSTOM_CONFIG: ComponentData.TInternalComponentConfig<TImageConfig> = {
    interactive: {
      base: [
        {
          ...DEFAULT_INTERACTIVE_BASE_CONFIG,
          type: 'click',
          name: '当点击项时',
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
            description: '数据值',
            id: 'value',
            type: 'string',
          },
        ],
      },
    },
    options: {
      type: 'color',
      clipPath: 'none',
      content: DEFAULT_COLOR,
      repeat: {
        x: false,
        y: false,
      },
      preview: {
        show: false,
      },
      condition: DEFAULT_CONDITION_CONFIG(),
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
          zIndex: 1,
        },
      },
      CUSTOM_CONFIG,
    );

  return DefaultConfig;
};

export const themeConfig = {
  convert: (colorList: string[]) => {
    return {};
  },
};
