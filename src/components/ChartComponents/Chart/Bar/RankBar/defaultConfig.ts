import { mergeWithoutArray } from '@/utils';
import {
  BASIC_DEFAULT_CONFIG,
  BASIC_DEFAULT_DATA_CONFIG,
  BASIC_DEFAULT_INTERACTIVE_CONFIG,
  DEFAULT_TOOLTIP_CONFIG,
  DEFAULT_FONT_CONFIG,
  DEFAULT_ANIMATION_CONFIG,
  DEFAULT_CONDITION_CONFIG,
  DEFAULT_TOOLTIP_ANIMATION_CONFIG,
  DEFAULT_THEME_RADIAL_COLOR_LIST,
  DEFAULT_GRID_CONFIG,
  DEFAULT_LINKAGE_CONFIG,
  DEFAULT_BAR_CAROUSEL_CONFIG,
  DEFAULT_INTERACTIVE_BASE_CONFIG,
} from '../../../Common/Constants/defaultConfig';
import { getName, getNumberValue } from '@/utils/constants';
import ThemeUtil from '@/utils/Assist/Theme';
import { TRankBarConfig } from './type';

const DEFAULT_DATE_LABEL = getName(5);
const DEFAULT_DATE_VALUE = getNumberValue(5);

const DEFAULT_VALUE = DEFAULT_DATE_LABEL.map((item, index) => {
  return {
    name: item,
    value: DEFAULT_DATE_VALUE[index],
  };
});

export default () => {
  const DEFAULT_THEME_RADIAL_COLOR_LIST_DATA =
    DEFAULT_THEME_RADIAL_COLOR_LIST();

  const CUSTOM_CONFIG: ComponentData.TInternalComponentConfig<TRankBarConfig> =
    {
      interactive: {
        base: [
          {
            ...DEFAULT_INTERACTIVE_BASE_CONFIG,
            type: 'click',
            name: '当点击项时',
            fields: [
              {
                key: 'name',
                variable: '',
                description: '名称',
              },
              {
                key: 'value',
                variable: '',
                description: '值',
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
              field: 'name',
              map: '',
              description: '名称',
              id: 'name',
              type: 'string',
            },
            {
              field: 'value',
              map: '',
              description: '值',
              id: 'value',
              type: 'number',
            },
          ],
        },
      },
      options: {
        grid: {
          ...DEFAULT_GRID_CONFIG,
          left: 160,
          right: 60,
        },
        yAxis: {
          textStyle: {
            ...DEFAULT_FONT_CONFIG,
          },
          rankIcon: {
            show: true,
            textStyle: {
              ...DEFAULT_FONT_CONFIG,
              fontWeight: 'bold',
            },
            showBackground: true,
          },
        },
        tooltip: {
          ...DEFAULT_TOOLTIP_CONFIG(),
          formatter: '{b0}: {c0}',
          animation: DEFAULT_TOOLTIP_ANIMATION_CONFIG,
        },
        animation: {
          ...DEFAULT_ANIMATION_CONFIG,
          animationDuration: 2000,
          animationEasing: 'quadraticInOut',
        },
        series: {
          carousel: {
            ...DEFAULT_BAR_CAROUSEL_CONFIG,
          },
          backgroundStyle: {
            show: true,
            color: {
              ...ThemeUtil.generateNextColor4CurrentTheme(0),
              a: 0.3,
            },
          },
          itemStyle: {
            color: DEFAULT_THEME_RADIAL_COLOR_LIST_DATA.slice(0, 3).map(
              (item) => {
                return {
                  ...item,
                  end: {
                    ...item.end,
                    a: 0.4,
                  },
                };
              },
            ),
            defaultColor: {
              ...DEFAULT_THEME_RADIAL_COLOR_LIST_DATA[3],
              end: {
                ...DEFAULT_THEME_RADIAL_COLOR_LIST_DATA[3].end,
                a: 0.6,
              },
            },
          },
          barWidth: 12,
          label: {
            show: true,
            ...DEFAULT_FONT_CONFIG,
            color: {
              r: 255,
              g: 255,
              b: 255,
            },
            formatter: '{value}',
            position: 'deep-top',
          },
        },
        condition: DEFAULT_CONDITION_CONFIG(),
      },
    };

  const DefaultConfig: ComponentData.TComponentData<TRankBarConfig> =
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
  convert: (colorList: string[], options: TRankBarConfig) => {
    const DEFAULT_THEME_RADIAL_COLOR_LIST_DATA =
      DEFAULT_THEME_RADIAL_COLOR_LIST();
    const length = DEFAULT_THEME_RADIAL_COLOR_LIST_DATA.length;
    return {
      tooltip: {
        backgroundColor: DEFAULT_TOOLTIP_CONFIG().backgroundColor,
      },
      series: {
        backgroundStyle: {
          color: {
            ...ThemeUtil.generateNextColor4CurrentTheme(0),
            a: 0.3,
          },
        },
        itemStyle: {
          color: options.series.itemStyle.color.map((item, index) => {
            const { start, end } =
              DEFAULT_THEME_RADIAL_COLOR_LIST_DATA[index % length];
            return {
              ...item,
              start,
              end: {
                ...end,
                a: item.end.a,
              },
            };
          }),
          defaultColor: {
            ...DEFAULT_THEME_RADIAL_COLOR_LIST_DATA[3],
            end: {
              ...DEFAULT_THEME_RADIAL_COLOR_LIST_DATA[3].end,
              a: options.series.itemStyle.defaultColor.end.a,
            },
          },
        },
      },
    };
  },
};
