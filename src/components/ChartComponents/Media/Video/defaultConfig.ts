import { mergeWithoutArray } from '@/utils';
import {
  BASIC_DEFAULT_CONFIG,
  BASIC_DEFAULT_DATA_CONFIG,
  BASIC_DEFAULT_INTERACTIVE_CONFIG,
  DEFAULT_CONDITION_CONFIG,
} from '../../Common/Constants/defaultConfig';
import { TVideoConfig } from './type';

const DEFAULT_VALUE = {
  value: '',
};

export default () => {
  const CUSTOM_CONFIG: ComponentData.TInternalComponentConfig<TVideoConfig> = {
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
            description: '数据值',
            id: 'value',
            type: 'string',
          },
        ],
      },
    },
    options: {
      condition: DEFAULT_CONDITION_CONFIG(),
      clipPath: 'none',
      autoplay: true,
      loop: true,
      controls: true,
      muted: false,
    },
  };

  const DefaultConfig: ComponentData.TComponentData<TVideoConfig> =
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
          height: 150,
        },
      },
      CUSTOM_CONFIG,
    );

  return DefaultConfig;
};

export const themeConfig = {
  convert: (colorList: string[]) => {},
};
