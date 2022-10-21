import { mergeWithoutArray } from '@/utils';
import {
  BASIC_DEFAULT_CONFIG,
  BASIC_DEFAULT_DATA_CONFIG,
  BASIC_DEFAULT_INTERACTIVE_CONFIG,
} from '../../Common/Constants/defaultConfig';
import ThemeUtil from '@/utils/Assist/Theme';
import { TDecoration2Config } from './type';

export default () => {
  const CUSTOM_CONFIG: ComponentData.TInternalComponentConfig<TDecoration2Config> =
    {
      interactive: {
        base: [],
        linkage: [],
      },
      data: {
        request: {},
        filter: {
          map: [],
        },
        disabled: true,
      },
      options: {
        color: [
          ThemeUtil.generateNextColor4CurrentTheme(0),
          ThemeUtil.generateNextColor4CurrentTheme(1),
        ],
        dur: 6,
        reverse: false,
      },
    };

  const DefaultConfig: ComponentData.TComponentData<TDecoration2Config> =
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
          height: 100,
          border: {
            disabled: true,
          },
        },
      },
      CUSTOM_CONFIG,
    );

  return DefaultConfig;
};

export const themeConfig = {
  convert: (colorList: string[]) => {
    return {
      color: [
        ThemeUtil.generateNextColor4CurrentTheme(0),
        ThemeUtil.generateNextColor4CurrentTheme(1),
      ],
    };
  },
};
