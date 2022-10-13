import { mergeWithoutArray } from '@/utils';
import {
  BASIC_DEFAULT_CONFIG,
  BASIC_DEFAULT_DATA_CONFIG,
  BASIC_DEFAULT_INTERACTIVE_CONFIG,
  DEFAULT_FONT_CONFIG,
  DEFAULT_LINKAGE_CONFIG,
} from '../../Common/Constants/defaultConfig';
import ThemeUtil from '@/utils/Assist/Theme';
import { TTimeMachineConfig } from './type';

export default () => {
  const CUSTOM_CONFIG: ComponentData.TInternalComponentConfig<TTimeMachineConfig> =
    {
      interactive: {
        base: [],
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
          value: {
            value: Date.now().toString(),
          },
          valueType: 'object',
        },
        filter: {
          map: [],
        },
        disabled: true,
      },
      options: {
        textStyle: {
          ...DEFAULT_FONT_CONFIG,
          fontSize: 24,
        },
        icon: {
          show: false,
          value: 'bi-clock',
          position: 'before',
          size: 24,
          color: ThemeUtil.generateNextColor4CurrentTheme(0),
          margin: 4,
        },
        formatter: 'YYYY-MM-DD HH:mm:ss',
      },
    };

  const DefaultConfig: ComponentData.TComponentData<TTimeMachineConfig> =
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
          height: 40,
        },
      },
      CUSTOM_CONFIG,
    );
  return DefaultConfig;
};

export const themeConfig = {
  cover: (colorList: string[]) => {},
};
