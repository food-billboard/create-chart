import { mergeWithoutArray } from '@/utils';
import {
  BASIC_DEFAULT_CONFIG,
  BASIC_DEFAULT_DATA_CONFIG,
  BASIC_DEFAULT_INTERACTIVE_CONFIG,
  DEFAULT_CONDITION_CONFIG,
} from '@/utils/constants/defaultComponentConfig';
import { TAudioConfig } from './type';

const DEFAULT_VALUE = {
  value: '',
};

export default () => {
  const CUSTOM_CONFIG: ComponentData.TInternalComponentConfig<TAudioConfig> = {
    interactive: {
      base: [],
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
            description: '地址(MP3)',
            id: 'value',
            type: 'string',
          },
        ],
      },
    },
    options: {
      condition: DEFAULT_CONDITION_CONFIG(),
      autoplay: true,
      loop: true,
      controls: true,
    },
  };

  const DefaultConfig: ComponentData.TComponentData<TAudioConfig> =
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
          height: 50,
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
