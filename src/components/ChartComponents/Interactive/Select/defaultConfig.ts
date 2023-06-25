import { mergeWithoutArray } from '@/utils';
import {
  BASIC_DEFAULT_CONFIG,
  BASIC_DEFAULT_DATA_CONFIG,
  BASIC_DEFAULT_INTERACTIVE_CONFIG,
  DEFAULT_FONT_CONFIG,
  DEFAULT_INTERACTIVE_BASE_CONFIG,
} from '../../Common/Constants/defaultConfig';
import { getName } from '@/utils/constants';
import ThemeUtil from '@/utils/Assist/Theme';
import { TSelectConfig } from './type';

const DEFAULT_NAME_LABEL = getName(3);

const DEFAULT_VALUE = DEFAULT_NAME_LABEL.map((item) => ({
  name: item,
  value: item,
}));

export default () => {
  const CUSTOM_CONFIG: ComponentData.TInternalComponentConfig<TSelectConfig> = {
    interactive: {
      base: [
        {
          ...DEFAULT_INTERACTIVE_BASE_CONFIG,
          type: 'select',
          name: '当选中项时',
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
            type: 'string',
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
        height: 48,
      },
      menu: {
        height: 200,
        backgroundColor: {
          r: 0,
          g: 0,
          b: 0,
        },
      },
      baseHover: {
        textStyle: {
          ...DEFAULT_FONT_CONFIG,
          fontSize: 24,
          color: {
            r: 255,
            g: 255,
            b: 255,
          },
        },
        backgroundColor: {
          ...ThemeUtil.generateNextColor4CurrentTheme(0),
          a: 0.5,
        },
      },
      activeHover: {
        textStyle: {
          ...DEFAULT_FONT_CONFIG,
          color: {
            r: 255,
            g: 255,
            b: 255,
          },
          fontSize: 24,
        },
        backgroundColor: {
          ...ThemeUtil.generateNextColor4CurrentTheme(0),
          a: 0.7,
        },
      },
      activeSelect: {
        textStyle: {
          ...DEFAULT_FONT_CONFIG,
          color: {
            r: 255,
            g: 255,
            b: 255,
          },
          fontSize: 24,
        },
        backgroundColor: {
          ...ThemeUtil.generateNextColor4CurrentTheme(0),
          a: 0.7,
        },
      },
      placeholder: {
        textStyle: {
          ...DEFAULT_FONT_CONFIG,
          color: {
            r: 255,
            g: 255,
            b: 255,
            a: 0.7,
          },
          fontSize: 24,
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
      indicator: {
        color: {
          r: 255,
          g: 255,
          b: 255,
        },
        fontSize: 24,
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

  return DefaultConfig;
};

export const themeConfig = {
  convert: (colorList: string[], options: TSelectConfig) => {
    return {
      baseHover: {
        backgroundColor: {
          ...ThemeUtil.generateNextColor4CurrentTheme(0),
          a: options.baseHover.backgroundColor.a,
        },
      },
      activeHover: {
        backgroundColor: {
          ...ThemeUtil.generateNextColor4CurrentTheme(0),
          a: options.activeHover.backgroundColor.a,
        },
      },
      activeSelect: {
        backgroundColor: {
          ...ThemeUtil.generateNextColor4CurrentTheme(0),
          a: options.activeSelect.backgroundColor.a,
        },
      },
      active: {
        textStyle: {
          color: ThemeUtil.generateNextColor4CurrentTheme(0),
        },
        border: {
          color: ThemeUtil.generateNextColor4CurrentTheme(0),
        },
      },
    };
  },
};
