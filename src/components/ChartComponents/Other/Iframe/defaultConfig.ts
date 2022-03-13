import { mergeWithoutArray } from '@/utils';
import {
  BASIC_DEFAULT_CONFIG,
  BASIC_DEFAULT_DATA_CONFIG,
  BASIC_DEFAULT_INTERACTIVE_CONFIG,
} from '../../Common/Constants/defaultConfig';
import { TIFrameConfig } from './type';

const DEFAULT_VALUE = {
  value: '/preview',
};

const CUSTOM_CONFIG: ComponentData.TInternalComponentConfig<TIFrameConfig> = {
  interactive: {
    base: [],
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
  options: {},
};

const DefaultConfig: ComponentData.TComponentData<TIFrameConfig> =
  mergeWithoutArray(
    {},
    {
      data: BASIC_DEFAULT_DATA_CONFIG,
      interactive: BASIC_DEFAULT_INTERACTIVE_CONFIG,
    },
    BASIC_DEFAULT_CONFIG,
    {
      style: {
        width: 600,
        height: 600,
      },
    },
    CUSTOM_CONFIG,
  );

export default DefaultConfig;
