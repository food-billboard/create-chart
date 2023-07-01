import { mergeWithoutArray } from '@/utils';
import {
  BASIC_DEFAULT_CONFIG,
  BASIC_DEFAULT_DATA_CONFIG,
  BASIC_DEFAULT_INTERACTIVE_CONFIG,
  DEFAULT_FONT_CONFIG,
  DEFAULT_LINKAGE_CONFIG,
  DEFAULT_INTERACTIVE_BASE_CONFIG,
} from '../../Common/Constants/defaultConfig';
import { getName } from '@/utils/constants';
import ThemeUtil from '@/utils/Assist/Theme';
import { TTabConfig } from './type';

const DEFAULT_NAME_LABEL = getName(3);

const DEFAULT_VALUE = DEFAULT_NAME_LABEL.map((item) => ({
  name: item,
  value: item,
}));

export default () => {
  const CUSTOM_CONFIG: ComponentData.TInternalComponentConfig<TTabConfig> = {
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
              _defaultValue_: false,
            },
            {
              key: 'name',
              variable: '',
              description: '数据名',
            },
          ],
        },
        {
          ...DEFAULT_INTERACTIVE_BASE_CONFIG,
          type: 'loop',
          name: '当项改变时',
          fields: [
            {
              key: 'value',
              variable: '',
              description: '数据值',
              _defaultValue_: false,
            },
            {
              key: 'name',
              variable: '',
              description: '数据名',
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
            id: 'value',
            type: 'string',
          },
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
      defaultValue: DEFAULT_VALUE[0].value,
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
      loop: {
        show: false,
        speed: 3000,
      },
    },
  };

  const DefaultConfig: ComponentData.TComponentData<TTabConfig> =
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
  convert: (colorList: string[]) => {
    return {
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
