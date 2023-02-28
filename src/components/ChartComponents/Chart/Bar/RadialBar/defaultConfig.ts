import { merge, omit } from 'lodash';
import { mergeWithoutArray } from '@/utils';
import {
  BASIC_DEFAULT_CONFIG,
  BASIC_DEFAULT_DATA_CONFIG,
  BASIC_DEFAULT_INTERACTIVE_CONFIG,
  DEFAULT_LEGEND_CONFIG,
  DEFAULT_X_AXIS_CONFIG,
  DEFAULT_Y_AXIS_CONFIG,
  DEFAULT_TOOLTIP_CONFIG,
  DEFAULT_FONT_CONFIG,
  DEFAULT_ANIMATION_CONFIG,
  DEFAULT_CONDITION_CONFIG,
  DEFAULT_TOOLTIP_ANIMATION_CONFIG,
  DEFAULT_RADIAL_CONFIG,
  DEFAULT_THEME_RADIAL_COLOR_LIST,
  DEFAULT_GRID_CONFIG,
  DEFAULT_LINKAGE_CONFIG,
  DEFAULT_BAR_CAROUSEL_CONFIG,
} from '@/utils/constants/defaultComponentConfig';
import ThemeUtil from '@/utils/Assist/Theme';
import { getDate, getNumberValue } from '@/utils/constants/defaultValue';
import { TRadialBarConfig } from './type';

const DEFAULT_DATE_LABEL = getDate(10);
const DEFAULT_DATE_VALUE = getNumberValue(10);

const DEFAULT_VALUE = DEFAULT_DATE_LABEL.map((item, index) => {
  return {
    x: item,
    y: DEFAULT_DATE_VALUE[index],
  };
});

export default () => {
  const CUSTOM_CONFIG: ComponentData.TInternalComponentConfig<TRadialBarConfig> =
    {
      interactive: {
        base: [
          {
            type: 'click',
            name: '当点击项时',
            show: false,
            fields: [
              {
                key: 'x',
                variable: '',
                description: 'x轴',
              },
              {
                key: 'y',
                variable: '',
                description: 'y轴',
              },
              {
                key: 's',
                variable: '',
                description: '系列',
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
              field: 'x',
              map: '',
              description: 'x轴',
              id: 'x',
              type: 'string',
            },
            {
              field: 'y',
              map: '',
              description: 'y轴',
              id: 'y',
              type: 'number',
            },
            {
              field: 's',
              map: '',
              description: '系列',
              id: 's',
              type: 'string',
            },
          ],
        },
      },
      options: {
        grid: {
          ...DEFAULT_GRID_CONFIG,
        },
        legend: omit(DEFAULT_LEGEND_CONFIG, 'type'),
        xAxis: DEFAULT_X_AXIS_CONFIG,
        yAxis: merge({}, DEFAULT_Y_AXIS_CONFIG, {
          splitLine: {
            show: false,
            lineStyle: {
              width: 1,
              type: 'solid' as any,
              color: {
                ...ThemeUtil.generateNextColor4CurrentTheme(0),
                a: 0.4,
              },
            },
          },
        }),
        tooltip: {
          ...DEFAULT_TOOLTIP_CONFIG(),
          animation: DEFAULT_TOOLTIP_ANIMATION_CONFIG,
        },
        animation: {
          ...DEFAULT_ANIMATION_CONFIG,
          animationDuration: 2000,
          animationEasing: 'quadraticInOut',
        },
        series: {
          showBackground: false,
          carousel: {
            ...DEFAULT_BAR_CAROUSEL_CONFIG,
          },
          backgroundStyle: {
            ...DEFAULT_RADIAL_CONFIG,
            start: {
              r: 180,
              g: 180,
              b: 180,
              a: 0.2,
            },
            end: {
              r: 180,
              g: 180,
              b: 180,
              a: 0.2,
            },
          },
          label: {
            show: false,
            position: 'inside',
            rotate: 0,
            ...DEFAULT_FONT_CONFIG,
            color: {
              r: 255,
              g: 255,
              b: 255,
            },
          },
          itemStyle: {
            color: DEFAULT_THEME_RADIAL_COLOR_LIST(),
          },
          barGap: 1,
          barWidth: 'auto',
        },
        condition: DEFAULT_CONDITION_CONFIG(),
      },
    };

  const DefaultConfig: ComponentData.TComponentData<TRadialBarConfig> =
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
  convert: (colorList: string[], options: TRadialBarConfig) => {
    const realColorList = DEFAULT_THEME_RADIAL_COLOR_LIST();
    const length = realColorList.length;
    return {
      yAxis: {
        splitLine: {
          lineStyle: {
            color: {
              ...ThemeUtil.generateNextColor4CurrentTheme(0),
              a: options.yAxis.splitLine.lineStyle.color.a,
            },
          },
        },
      },
      tooltip: {
        backgroundColor: DEFAULT_TOOLTIP_CONFIG().backgroundColor,
      },
      series: {
        itemStyle: {
          color: options.series.itemStyle.color.map((item, index) => {
            return {
              ...item,
              start: realColorList[index % length].start,
              end: realColorList[index % length].end,
            };
          }),
        },
      },
    };
  },
};
