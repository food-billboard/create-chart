import { omit } from 'lodash';
import { mergeWithoutArray } from '@/utils';
import {
  BASIC_DEFAULT_CONFIG,
  BASIC_DEFAULT_DATA_CONFIG,
  BASIC_DEFAULT_INTERACTIVE_CONFIG,
  DEFAULT_TOOLTIP_CONFIG,
  DEFAULT_ANIMATION_CONFIG,
  DEFAULT_CONDITION_CONFIG,
  DEFAULT_TOOLTIP_ANIMATION_CONFIG,
  DEFAULT_FONT_CONFIG,
  DEFAULT_THEME_COLOR_LIST,
} from '../../../Common/Constants/defaultConfig';
import { getDate, getNumberValue } from '@/utils/constants';
import { TBubbleScatterConfig } from './type';

const DEFAULT_NAME_LABEL = getDate(20);
const DEFAULT_DATE_MAX_VALUE = getNumberValue(20, 5, 10);
const DEFAULT_DATE_MIN_VALUE = getNumberValue(20, 1, 4);

const DEFAULT_VALUE = DEFAULT_NAME_LABEL.map((item, index) => {
  return {
    x: item,
    y: [DEFAULT_DATE_MIN_VALUE[index], DEFAULT_DATE_MAX_VALUE[index]],
  };
});

const CUSTOM_CONFIG: ComponentData.TInternalComponentConfig<TBubbleScatterConfig> =
  {
    interactive: {
      base: [],
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
            type: 'number[]',
          },
          {
            field: 's',
            map: '',
            description: '系列',
            id: 's',
            type: 'number',
          },
        ],
      },
    },
    options: {
      condition: [DEFAULT_CONDITION_CONFIG()],
      tooltip: {
        ...DEFAULT_TOOLTIP_CONFIG,
        animation: DEFAULT_TOOLTIP_ANIMATION_CONFIG,
        show: false,
      },
      xAxis: {
        left: 150,
        axisLabel: {
          ...DEFAULT_FONT_CONFIG,
          show: true,
          rotate: 0,
          margin: 8,
          formatter: '{value}',
        },
        axisTick: {
          show: true,
          lineStyle: {
            color: {
              r: 255,
              g: 255,
              b: 255,
            },
            width: 1,
            type: 'solid',
          },
        },
        axisLine: {
          show: true,
          symbol: 'none',
          symbolSize: [10, 15],
          lineStyle: {
            color: {
              r: 255,
              g: 255,
              b: 255,
            },
            width: 1,
            type: 'solid',
          },
        },
        name: '',
        nameTextStyle: DEFAULT_FONT_CONFIG,
        nameGap: 15,
      },
      title: {
        show: true,
        textStyle: {
          ...DEFAULT_FONT_CONFIG,
          fontWeight: 'bold',
          fontSize: 20,
          color: {
            r: 255,
            g: 255,
            b: 255,
          },
        },
        defaultValue: '默认标题',
      },
      animation: {
        ...DEFAULT_ANIMATION_CONFIG,
        animationDuration: 2000,
        animationEasing: 'quadraticInOut',
      },
      series: {
        itemStyle: {
          color: DEFAULT_THEME_COLOR_LIST,
        },
        symbolSize: 6,
      },
    },
  };

const DefaultConfig: ComponentData.TComponentData<TBubbleScatterConfig> =
  mergeWithoutArray(
    {},
    {
      data: BASIC_DEFAULT_DATA_CONFIG,
      interactive: BASIC_DEFAULT_INTERACTIVE_CONFIG,
    },
    BASIC_DEFAULT_CONFIG,
    {
      style: {
        width: 800,
        height: 120,
      },
    },
    CUSTOM_CONFIG,
  );

export default DefaultConfig;
