import { mergeWithoutArray } from '@/utils';
import {
  BASIC_DEFAULT_CONFIG,
  BASIC_DEFAULT_DATA_CONFIG,
  BASIC_DEFAULT_INTERACTIVE_CONFIG,
  DEFAULT_TOOLTIP_CONFIG,
  DEFAULT_FONT_CONFIG,
  DEFAULT_ANIMATION_CONFIG,
  DEFAULT_CONDITION_CONFIG,
  DEFAULT_RADIAL_CONFIG,
  DEFAULT_GRID_CONFIG,
  DEFAULT_LINKAGE_CONFIG,
} from '@/utils/constants/defaultComponentConfig';
import ThemeUtil from '@/utils/Assist/Theme';
import { TProgressBarConfig } from './type';

const DEFAULT_VALUE = {
  value: 80,
};

export default () => {
  const CUSTOM_CONFIG: ComponentData.TInternalComponentConfig<TProgressBarConfig> =
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
                description: '值',
              },
            ],
          },
        ],
        linkage: [
          {
            ...DEFAULT_LINKAGE_CONFIG,
            type: 'click',
            name: '点击进度条',
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
        },
        yAxis: {
          axisLabel: {
            show: true,
            textStyle: DEFAULT_FONT_CONFIG,
            value: '百分比',
          },
        },
        tooltip: {
          ...DEFAULT_TOOLTIP_CONFIG(),
        },
        animation: {
          ...DEFAULT_ANIMATION_CONFIG,
          animationDuration: 2000,
          animationEasing: 'quadraticInOut',
        },
        series: {
          showBackground: false,
          backgroundStyle: {
            color: {
              r: 180,
              g: 180,
              b: 180,
              a: 0.2,
            },
          },
          label: {
            show: true,
            ...DEFAULT_FONT_CONFIG,
            color: {
              r: 255,
              g: 255,
              b: 255,
            },
            formatter: '{@score}%',
          },
          itemStyle: {
            color: {
              ...DEFAULT_RADIAL_CONFIG,
              start: ThemeUtil.generateNextColor4CurrentTheme(0),
              end: ThemeUtil.generateNextColor4CurrentTheme(1),
            },
          },
          barWidth: 20,
        },
        condition: DEFAULT_CONDITION_CONFIG(),
      },
    };

  const DefaultConfig: ComponentData.TComponentData<TProgressBarConfig> =
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
          height: 120,
        },
      },
      CUSTOM_CONFIG,
    );
  return DefaultConfig;
};

export const themeConfig = {
  convert: (colorList: string[], options: TProgressBarConfig) => {
    return {
      tooltip: {
        backgroundColor: DEFAULT_TOOLTIP_CONFIG().backgroundColor,
      },
      series: {
        itemStyle: {
          color: {
            ...options.series.itemStyle.color,
            start: ThemeUtil.generateNextColor4CurrentTheme(0),
            end: ThemeUtil.generateNextColor4CurrentTheme(1),
          },
        },
      },
    };
  },
};
