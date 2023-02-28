import { omit } from 'lodash';
import { mergeWithoutArray } from '@/utils';
import {
  BASIC_DEFAULT_CONFIG,
  BASIC_DEFAULT_DATA_CONFIG,
  BASIC_DEFAULT_INTERACTIVE_CONFIG,
  DEFAULT_LEGEND_CONFIG,
  DEFAULT_TOOLTIP_CONFIG,
  DEFAULT_FONT_CONFIG,
  DEFAULT_ANIMATION_CONFIG,
  DEFAULT_CONDITION_CONFIG,
  DEFAULT_TOOLTIP_ANIMATION_CONFIG,
  DEFAULT_THEME_COLOR_LIST,
  DEFAULT_LINKAGE_CONFIG,
} from '@/utils/constants/defaultComponentConfig';
import ThemeUtil from '@/utils/Assist/Theme';
import { getName, getNumberValue } from '@/utils/constants/defaultValue';
import { TRadarBasicConfig } from './type';

const MIN = 20;
const MAX = 100;

const DEFAULT_NAME_LABEL = getName(7);
const DEFAULT_DATE_VALUE = getNumberValue(7, MIN, MAX);

const DEFAULT_VALUE = DEFAULT_NAME_LABEL.map((item, index) => {
  return {
    name: item,
    value: DEFAULT_DATE_VALUE[index],
    max: MAX,
  };
});

export default () => {
  const DEFAULT_THEME_COLOR_LIST_DATA = DEFAULT_THEME_COLOR_LIST();
  const CUSTOM_CONFIG: ComponentData.TInternalComponentConfig<TRadarBasicConfig> =
    {
      interactive: {
        base: [],
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
        },
        filter: {
          map: [
            {
              field: 'name',
              map: '',
              description: '数据项',
              id: 'name',
              type: 'string',
            },
            {
              field: 'value',
              map: '',
              description: '数据值',
              id: 'value',
              type: 'number',
            },
            {
              field: 'max',
              map: '',
              description: '最大值',
              id: 'max',
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
        condition: DEFAULT_CONDITION_CONFIG(),
        legend: omit(DEFAULT_LEGEND_CONFIG, 'type'),
        tooltip: {
          ...DEFAULT_TOOLTIP_CONFIG(),
          animation: DEFAULT_TOOLTIP_ANIMATION_CONFIG,
        },
        animation: {
          ...DEFAULT_ANIMATION_CONFIG,
          animationDuration: 2000,
          animationEasing: 'quadraticInOut',
        },
        radar: {
          center: [50, 50],
          radius: 75,
          axisName: {
            show: true,
            formatter: '{value}',
            ...DEFAULT_FONT_CONFIG,
          },
          axisNameGap: 15,
          splitNumber: 5,
          shape: 'polygon',
          axisLine: {
            show: false,
            lineStyle: {
              color: DEFAULT_THEME_COLOR_LIST_DATA[0],
              width: 1,
              type: 'solid',
            },
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: {
                ...ThemeUtil.generateNextColor4CurrentTheme(0),
                a: 0.4,
              },
              width: 1,
              type: 'solid',
            },
          },
          splitArea: {
            show: false,
            areaStyle: {
              color: [
                {
                  ...DEFAULT_THEME_COLOR_LIST_DATA[0],
                  a: 0.3,
                },
                {
                  ...DEFAULT_THEME_COLOR_LIST_DATA[1],
                  a: 0.3,
                },
              ],
            },
          },
        },
        series: {
          label: {
            show: false,
            position: 'top',
            distance: 5,
            formatter: '{b}: {c}',
            ...DEFAULT_FONT_CONFIG,
            color: {
              r: 255,
              g: 255,
              b: 255,
            },
          },
          itemStyle: {
            color: [],
          },
          symbol: 'circle',
          symbolSize: 4,
          lineStyle: [],
          areaStyle: {
            color: [],
          },
        },
      },
    };

  const DefaultConfig: ComponentData.TComponentData<TRadarBasicConfig> =
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
  convert: (colorList: string[], options: TRadarBasicConfig) => {
    return {
      tooltip: {
        backgroundColor: DEFAULT_TOOLTIP_CONFIG().backgroundColor,
      },
      radar: {
        axisLine: {
          lineStyle: {
            color: ThemeUtil.generateNextColor4CurrentTheme(0),
          },
        },
        splitLine: {
          lineStyle: {
            color: {
              ...ThemeUtil.generateNextColor4CurrentTheme(0),
              a: options.radar.splitLine.lineStyle.color.a,
            },
          },
        },
        splitArea: {
          areaStyle: {
            color: [
              {
                ...ThemeUtil.generateNextColor4CurrentTheme(0),
                a: options.radar.splitArea.areaStyle.color[0].a,
              },
              {
                ...ThemeUtil.generateNextColor4CurrentTheme(1),
                a: options.radar.splitArea.areaStyle.color[1].a,
              },
            ],
          },
        },
      },
      series: {
        itemStyle: {
          color: options.series.itemStyle.color.map((item, index) => {
            return ThemeUtil.generateNextColor4CurrentTheme(index);
          }),
        },
        lineStyle: options.series.lineStyle.map((item, index) => {
          return {
            ...item,
            color: ThemeUtil.generateNextColor4CurrentTheme(index),
          };
        }),
        areaStyle: {
          color: options.series.areaStyle.color.map((item, index) => {
            return ThemeUtil.generateNextColor4CurrentTheme(index);
          }),
        },
      },
    };
  },
};
