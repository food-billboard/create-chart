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
  DEFAULT_LINKAGE_CONFIG,
} from '@/utils/constants/defaultComponentConfig';
import ThemeUtil from '@/utils/Assist/Theme';
import { getName, getNumberValue } from '@/utils/constants/defaultValue';
import { TPolarBarConfig } from './type';

const DEFAULT_DATE_LABEL = getName(5);
const DEFAULT_DATE_VALUE = getNumberValue(5, 0, 100);

const DEFAULT_VALUE = DEFAULT_DATE_LABEL.map((item, index) => {
  return {
    name: item,
    value: DEFAULT_DATE_VALUE[index],
  };
});

export default () => {
  const CUSTOM_CONFIG: ComponentData.TInternalComponentConfig<TPolarBarConfig> =
    {
      interactive: {
        base: [
          {
            type: 'click',
            name: '当点击项时',
            show: false,
            fields: [
              {
                key: 'name',
                variable: '',
                description: '数据名',
              },
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
              description: '数据名',
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
          ],
        },
      },
      options: {
        polar: {
          radius: [0, 60],
        },
        angleAxis: {
          min: 0,
          max: 100,
          startAngle: 90,
          axisLabel: {
            ...DEFAULT_FONT_CONFIG,
            show: true,
            margin: 8,
          },
        },
        legend: omit(DEFAULT_LEGEND_CONFIG, 'type'),
        tooltip: {
          ...DEFAULT_TOOLTIP_CONFIG(),
        },
        animation: {
          ...DEFAULT_ANIMATION_CONFIG,
          animationDuration: 2000,
          animationEasing: 'quadraticInOut',
        },
        series: {
          label: {
            show: false,
            position: 'inside',
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
          barWidth: 20,
        },
        condition: DEFAULT_CONDITION_CONFIG(),
      },
    };

  const DefaultConfig: ComponentData.TComponentData<TPolarBarConfig> =
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
  convert: (colorList: string[], options: TPolarBarConfig) => {
    return {
      tooltip: {
        backgroundColor: DEFAULT_TOOLTIP_CONFIG().backgroundColor,
      },
      series: {
        itemStyle: {
          color: options.series.itemStyle.color.map((item, index) => {
            return ThemeUtil.generateNextColor4CurrentTheme(index);
          }),
        },
      },
    };
  },
};
