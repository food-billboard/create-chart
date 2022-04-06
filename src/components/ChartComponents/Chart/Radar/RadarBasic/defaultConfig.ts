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
} from '../../../Common/Constants/defaultConfig';
import { getName, getNumberValue } from '@/utils/constants';
import ThemeUtil from '@/utils/Assist/Theme';
import { TRadarBasicConfig } from './type';

const MIN = 20;
const MAX = 100;

const DEFAULT_NAME_LABEL = getName(5);
const DEFAULT_DATE_VALUE = getNumberValue(5, MIN, MAX);

const DEFAULT_VALUE = DEFAULT_NAME_LABEL.map((item, index) => {
  return {
    name: item,
    value: DEFAULT_DATE_VALUE[index],
  };
});

const CUSTOM_CONFIG: ComponentData.TInternalComponentConfig<TRadarBasicConfig> =
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
      condition: [DEFAULT_CONDITION_CONFIG()],
      legend: omit(DEFAULT_LEGEND_CONFIG, 'type'),
      tooltip: {
        ...DEFAULT_TOOLTIP_CONFIG,
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
            color: {
              r: 33,
              g: 33,
              b: 33,
            },
            width: 1,
            type: 'solid',
          },
        },
        splitLine: {
          show: true,
          lineStyle: {
            color: {
              r: 204,
              g: 204,
              b: 204,
            },
            width: 1,
            type: 'solid',
          },
        },
        splitArea: {
          show: true,
          areaStyle: {
            color: [
              {
                ...ThemeUtil.generateNextColor4CurrentTheme(0),
                a: 0.3,
              },
              {
                r: 250,
                g: 250,
                b: 250,
                a: 0,
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

export default DefaultConfig;
