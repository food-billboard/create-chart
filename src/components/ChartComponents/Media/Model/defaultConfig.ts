import { mergeWithoutArray } from '@/utils';
import {
  BASIC_DEFAULT_CONFIG,
  BASIC_DEFAULT_DATA_CONFIG,
  BASIC_DEFAULT_INTERACTIVE_CONFIG,
} from '../../Common/Constants/defaultConfig';
import { TModelConfig } from './type';

const DEFAULT_VALUE = {
  value: '',
};

export default () => {
  const CUSTOM_CONFIG: ComponentData.TInternalComponentConfig<TModelConfig> = {
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
            description: '模型地址',
            id: 'value',
            type: 'string',
          },
        ],
      },
    },
    options: {
      position: {
        x: 0,
        y: 0,
        z: 0,
      },
      focus: {
        x: 0,
        y: 0,
        z: 0,
      },
      scale: 1,
      color: {
        r: 0,
        b: 0,
        g: 0,
        a: 0,
      },
      rotate: {
        show: true,
        speed: 10,
      },
    },
  };

  const DefaultConfig: ComponentData.TComponentData<TModelConfig> =
    mergeWithoutArray(
      {},
      {
        data: BASIC_DEFAULT_DATA_CONFIG,
        interactive: BASIC_DEFAULT_INTERACTIVE_CONFIG,
      },
      BASIC_DEFAULT_CONFIG,
      {
        style: {
          width: 400,
          height: 400,
        },
      },
      CUSTOM_CONFIG,
    );

  return DefaultConfig;
};
