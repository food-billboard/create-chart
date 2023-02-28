import { mergeWithoutArray } from '@/utils';
import {
  BASIC_DEFAULT_CONFIG,
  BASIC_DEFAULT_DATA_CONFIG,
  BASIC_DEFAULT_INTERACTIVE_CONFIG,
  DEFAULT_FONT_CONFIG,
  DEFAULT_CONDITION_CONFIG,
  DEFAULT_LINKAGE_CONFIG,
} from '../../Common/Constants/defaultConfig';
import { getText } from '@/utils/constants/defaultValue';
import ThemeUtil from '@/utils/Assist/Theme';
import { TStateListConfig } from './type';

const DEFAULT_TEXT = getText(6);

const DEFAULT_VALUE = new Array(DEFAULT_TEXT.length)
  .fill(0)
  .map((item, index) => {
    return {
      value: DEFAULT_TEXT[index],
    };
  });

export default () => {
  const CUSTOM_CONFIG: ComponentData.TInternalComponentConfig<TStateListConfig> =
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
                description: '内容',
              },
            ],
          },
        ],
        linkage: [
          {
            ...DEFAULT_LINKAGE_CONFIG,
            type: 'click-item',
            name: '点击项',
          },
        ],
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
              description: '内容',
              id: 'value',
              type: 'string',
            },
          ],
        },
      },
      options: {
        padding: [8, 8],
        condition: DEFAULT_CONDITION_CONFIG(),
        margin: [8, 8],
        textStyle: {
          ...DEFAULT_FONT_CONFIG,
        },
        align: {
          horizontal: 'center',
          vertical: 'center',
        },
        count: 6,
        column: 3,
        stateList: new Array(4).fill(0).map((item, index) => {
          return {
            backgroundColor: ThemeUtil.generateNextColor4CurrentTheme(index),
            borderRadius: [0, 0, 0, 0],
          };
        }),
      },
    };

  const DefaultConfig: ComponentData.TComponentData<TStateListConfig> =
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
          height: 300,
        },
      },
      CUSTOM_CONFIG,
    );

  return DefaultConfig;
};

export const themeConfig = {
  convert: (colorList: string[], options: TStateListConfig) => {
    return {
      stateList: options.stateList.map((item, index) => {
        return {
          ...item,
          backgroundColor: ThemeUtil.generateNextColor4CurrentTheme(index),
        };
      }),
    };
  },
};
