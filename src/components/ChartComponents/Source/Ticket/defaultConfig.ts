import { mergeWithoutArray } from '@/utils';
import {
  BASIC_DEFAULT_CONFIG,
  BASIC_DEFAULT_DATA_CONFIG,
  BASIC_DEFAULT_INTERACTIVE_CONFIG,
} from '../../Common/Constants/defaultConfig';
import ThemeUtil from '@/utils/Assist/Theme';
import { TTicketConfig } from './type';

export default () => {
  const CUSTOM_CONFIG: ComponentData.TInternalComponentConfig<TTicketConfig> = {
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
      radius: 15,
      length: 200,
      dashed: {
        show: true,
        color: {
          r: 255,
          g: 255,
          b: 255,
        },
      },
      shadow: {
        show: true,
      },
      color: ThemeUtil.generateNextColor4CurrentTheme(0),
    },
  };

  const DefaultConfig: ComponentData.TComponentData<TTicketConfig> =
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
        },
      },
      CUSTOM_CONFIG,
    );

  return DefaultConfig;
};

export const themeConfig = {
  convert: (colorList: string[]) => {
    return {
      color: ThemeUtil.generateNextColor4CurrentTheme(0),
    };
  },
};
