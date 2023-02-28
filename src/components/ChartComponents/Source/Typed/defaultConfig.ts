import { mergeWithoutArray } from '@/utils';
import {
  BASIC_DEFAULT_CONFIG,
  BASIC_DEFAULT_DATA_CONFIG,
  BASIC_DEFAULT_INTERACTIVE_CONFIG,
  DEFAULT_FONT_CONFIG,
  DEFAULT_LINKAGE_CONFIG,
} from '@/utils/constants/defaultComponentConfig';
import { TTypedConfig } from './type';

const DEFAULT_VALUE = {
  value: '这是一个打字机标题',
};

export default () => {
  const CUSTOM_CONFIG: ComponentData.TInternalComponentConfig<TTypedConfig> = {
    interactive: {
      base: [],
      linkage: [],
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
      textStyle: {
        ...DEFAULT_FONT_CONFIG,
      },
      loop: false,
      typeSpeed: 30,
    },
  };

  const DefaultConfig: ComponentData.TComponentData<TTypedConfig> =
    mergeWithoutArray(
      {},
      {
        data: BASIC_DEFAULT_DATA_CONFIG,
        interactive: BASIC_DEFAULT_INTERACTIVE_CONFIG,
      },
      BASIC_DEFAULT_CONFIG,
      {
        style: {
          width: 200,
          height: 60,
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
