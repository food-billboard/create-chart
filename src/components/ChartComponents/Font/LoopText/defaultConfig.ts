import { mergeWithoutArray } from '@/utils';
import {
  BASIC_DEFAULT_CONFIG,
  BASIC_DEFAULT_DATA_CONFIG,
  BASIC_DEFAULT_INTERACTIVE_CONFIG,
  DEFAULT_FONT_CONFIG,
  DEFAULT_CONDITION_CONFIG,
} from '../../Common/Constants/defaultConfig';
import { getText } from '@/utils/constants';
import { TLoopTextConfig } from './type';

const DEFAULT_VALUE = {
  value: getText(10),
};

export default () => {
  const CUSTOM_CONFIG: ComponentData.TInternalComponentConfig<TLoopTextConfig> =
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
              description: '数据值',
              id: 'value',
              type: 'string[]',
            },
          ],
        },
      },
      options: {
        condition: [DEFAULT_CONDITION_CONFIG()],
        textStyle: {
          ...DEFAULT_FONT_CONFIG,
          fontSize: 24,
        },
        align: {
          horizontal: 'flex-start',
          vertical: 'center',
        },
        animation: {
          interval: 3000,
          delay: 0,
        },
        addonBefore: {
          show: false,
          value: '',
          textStyle: {
            ...DEFAULT_FONT_CONFIG,
            fontSize: 24,
          },
        },
        addonAfter: {
          show: false,
          value: '',
          textStyle: {
            ...DEFAULT_FONT_CONFIG,
            fontSize: 24,
          },
        },
      },
    };

  const DefaultConfig: ComponentData.TComponentData<TLoopTextConfig> =
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
