import { mergeWithoutArray } from '@/utils';
import {
  BASIC_DEFAULT_CONFIG,
  BASIC_DEFAULT_DATA_CONFIG,
  BASIC_DEFAULT_INTERACTIVE_CONFIG,
  DEFAULT_FONT_CONFIG,
  DEFAULT_BORDER_RADIUS,
  DEFAULT_INTERACTIVE_BASE_CONFIG,
} from '../../Common/Constants/defaultConfig';
import ThemeUtil from '@/utils/Assist/Theme';
import { TInputConfig } from './type';

export default () => {
  const CUSTOM_CONFIG: ComponentData.TInternalComponentConfig<TInputConfig> = {
    interactive: {
      base: [
        {
          ...DEFAULT_INTERACTIVE_BASE_CONFIG,
          type: 'change',
          name: '当点击搜索时',
          fields: [
            {
              key: 'value',
              variable: '',
              description: '内容',
            },
          ],
        },
      ],
    },
    data: {
      request: {},
      filter: {
        map: [],
      },
      disabled: true,
    },
    options: {
      defaultValue: '',
      border: {
        type: 'solid',
        width: 1,
        color: {
          r: 33,
          g: 33,
          b: 33,
        },
      },
      borderRadius: DEFAULT_BORDER_RADIUS,
      placeholder: {
        value: '请输入内容',
        color: {
          r: 99,
          g: 99,
          b: 99,
        },
      },
      backgroundColor: {
        r: 255,
        g: 255,
        b: 255,
        a: 0,
      },
      textStyle: {
        ...DEFAULT_FONT_CONFIG,
        color: {
          r: 255,
          g: 255,
          b: 255,
        },
      },
      search: {
        show: true,
        value: '搜索',
        backgroundColor: ThemeUtil.generateNextColor4CurrentTheme(0),
        width: 30,
        textStyle: {
          ...DEFAULT_FONT_CONFIG,
          color: {
            r: 255,
            g: 255,
            b: 255,
          },
        },
      },
    },
  };

  const DefaultConfig: ComponentData.TComponentData<TInputConfig> =
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
          height: 50,
        },
      },
      CUSTOM_CONFIG,
    );

  return DefaultConfig;
};

export const themeConfig = {
  convert: (colorList: string[]) => {
    return {
      search: {
        backgroundColor: ThemeUtil.generateNextColor4CurrentTheme(0),
      },
    };
  },
};
