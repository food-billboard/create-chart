import { mergeWithoutArray } from '@/utils';
import ThemeUtil from '@/utils/Assist/Theme';
import {
  BASIC_DEFAULT_CONFIG,
  BASIC_DEFAULT_DATA_CONFIG,
  BASIC_DEFAULT_INTERACTIVE_CONFIG,
  DEFAULT_FONT_CONFIG,
  DEFAULT_CONDITION_CONFIG,
  DEFAULT_THEME_COLOR_LIST,
  DEFAULT_LINKAGE_CONFIG,
} from '@/utils/constants/defaultComponentConfig';
import { TPercentPieConfig } from './type';

export default () => {
  const DEFAULT_THEME_COLOR_LIST_DATA = DEFAULT_THEME_COLOR_LIST();
  const CUSTOM_CONFIG: ComponentData.TInternalComponentConfig<TPercentPieConfig> =
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
          value: {
            value: 80,
          },
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
        condition: DEFAULT_CONDITION_CONFIG(),
        animation: {
          scrollTimes: 100,
        },
        lineStyle: {
          color: new Array(4).fill(0).map((_, index) => {
            return {
              line: DEFAULT_THEME_COLOR_LIST_DATA[index],
              point: DEFAULT_THEME_COLOR_LIST_DATA[index],
            };
          }),
          point: {
            size: 4,
          },
          line: {
            width: 1.5,
          },
        },
        statistics: {
          show: true,
          textStyle: {
            ...DEFAULT_FONT_CONFIG,
            fontSize: 24,
          },
          addonAfter: {
            show: true,
            value: '%',
            textStyle: {
              ...DEFAULT_FONT_CONFIG,
              fontSize: 24,
            },
          },
        },
        series: {
          radius: {
            inner: [32, 35],
            outer: [40, 52],
          },
          itemStyle: {
            color: DEFAULT_THEME_COLOR_LIST_DATA,
          },
          backgroundColor: {
            ...DEFAULT_THEME_COLOR_LIST_DATA[0],
            a: 0.1,
          },
        },
      },
    };

  const DefaultConfig: ComponentData.TComponentData<TPercentPieConfig> =
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

export const themeConfig = {
  convert: (colorList: string[], options: TPercentPieConfig) => {
    const DEFAULT_THEME_COLOR_LIST_DATA = DEFAULT_THEME_COLOR_LIST();
    return {
      lineStyle: {
        color: options.lineStyle.color.map((_, index) => {
          return {
            line: DEFAULT_THEME_COLOR_LIST_DATA[index],
            point: DEFAULT_THEME_COLOR_LIST_DATA[index],
          };
        }),
      },
      series: {
        itemStyle: {
          color: options.series.itemStyle.color.map((item, index) => {
            return ThemeUtil.generateNextColor4CurrentTheme(index);
          }),
        },
        backgroundColor: {
          ...DEFAULT_THEME_COLOR_LIST_DATA[0],
          a: options.series.backgroundColor.a,
        },
      },
    };
  },
};
