import { mergeWithoutArray } from '@/utils';
import {
  BASIC_DEFAULT_CONFIG,
  BASIC_DEFAULT_DATA_CONFIG,
  BASIC_DEFAULT_INTERACTIVE_CONFIG,
  DEFAULT_FONT_CONFIG,
} from '../../Common/Constants/defaultConfig';
import { getNumberValue } from '@/utils/constants';
import { TCountUpNumberConfig } from './type';

const [DEFAULT_NUMBER_VALUE] = getNumberValue(1, 2000, 200000);

const DEFAULT_VALUE = {
  value: DEFAULT_NUMBER_VALUE,
};

const CUSTOM_CONFIG: ComponentData.TInternalComponentConfig<TCountUpNumberConfig> =
  {
    interactive: {
      base: [
        {
          type: 'click',
          name: '当点击项时',
          show: false,
          fields: [
            {
              key: 'value',
              variable: '',
              description: '数据值',
            },
          ],
        },
      ],
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
            type: 'number',
          },
        ],
      },
    },
    options: {
      textStyle: {
        ...DEFAULT_FONT_CONFIG,
        fontSize: 24,
      },
      animation: {
        duration: 2,
        easingFn: 'easeOutExpo',
      },
      addonBefore: {
        show: true,
        content: '￥',
      },
      addonAfter: {
        show: true,
        content: '元',
      },
      thousands: {
        show: true,
        content: ',',
      },
      round: {
        show: false,
        length: 0,
      },
      decimal: '.',
    },
  };

const DefaultConfig: ComponentData.TComponentData<TCountUpNumberConfig> =
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
        height: 40,
      },
    },
    CUSTOM_CONFIG,
  );

export default DefaultConfig;
