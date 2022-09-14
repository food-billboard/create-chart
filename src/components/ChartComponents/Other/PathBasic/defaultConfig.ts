import { mergeWithoutArray } from '@/utils';
import {
  BASIC_DEFAULT_CONFIG,
  BASIC_DEFAULT_DATA_CONFIG,
  BASIC_DEFAULT_INTERACTIVE_CONFIG,
  DEFAULT_CONDITION_CONFIG,
} from '../../Common/Constants/defaultConfig';
import ThemeUtil from '@/utils/Assist/Theme';
import { TPathBasicConfig } from './type';

const DEFAULT_VALUE = {
  value: '',
};

export default () => {
  const color = ThemeUtil.generateNextColor4CurrentTheme(0);
  const CUSTOM_CONFIG: ComponentData.TInternalComponentConfig<TPathBasicConfig> =
    {
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
              description: '路径',
              id: 'value',
              type: 'string',
            },
          ],
        },
      },
      options: {
        close: false,
        target: {
          type: 'custom',
          circle: {
            radius: 5,
            color,
          },
          rect: {
            width: 5,
            height: 5,
            color,
          },
          custom: {
            width: 20,
            height: 20,
            value: '',
          },
        },
        animation: {
          type: 'to',
          opacity: 'none',
          autoRotate: true,
          moveType: 'linear',
          speed: 2000,
        },
        path: {
          show: true,
          line: 'solid',
          width: 4,
          color: {
            r: 255,
            g: 255,
            b: 255,
          },
        },
        condition: DEFAULT_CONDITION_CONFIG(),
      },
    };

  const DefaultConfig: ComponentData.TComponentData<TPathBasicConfig> =
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
