import { mergeWithoutArray } from '@/utils';
import {
  BASIC_DEFAULT_CONFIG,
  BASIC_DEFAULT_DATA_CONFIG,
  BASIC_DEFAULT_INTERACTIVE_CONFIG,
  DEFAULT_FONT_CONFIG,
  DEFAULT_CONDITION_CONFIG,
  DEFAULT_LINKAGE_CONFIG,
} from '../../Common/Constants/defaultConfig';
import { TFontCarouselConfig } from './type';

const DEFAULT_VALUE = {
  value: '我是一串很长的' + '文字'.repeat(20),
};

export default () => {
  const CUSTOM_CONFIG: ComponentData.TInternalComponentConfig<TFontCarouselConfig> =
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
        textStyle: {
          ...DEFAULT_FONT_CONFIG,
          fontSize: 24,
        },
        speed: 20,
        direction: 'left',
        play: true,
        delay: 0,
        pauseOnHover: true,
      },
    };

  const DefaultConfig: ComponentData.TComponentData<TFontCarouselConfig> =
    mergeWithoutArray(
      {},
      {
        data: BASIC_DEFAULT_DATA_CONFIG,
        interactive: BASIC_DEFAULT_INTERACTIVE_CONFIG,
      },
      BASIC_DEFAULT_CONFIG,
      {
        style: {
          width: 180,
          height: 40,
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
