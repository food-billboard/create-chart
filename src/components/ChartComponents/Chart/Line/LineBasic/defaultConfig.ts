import { omit } from 'lodash';
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
} from '../../../Common/Constants/defaultConfig';
import { getDate, getNumberValue, getSeries } from '@/utils/constants';
import { TLineBasicConfig } from './type';

const DEFAULT_DATE_LABEL = getDate(10);
const DEFAULT_DATE_VALUE = getNumberValue(10);
const DEFAULT_SERIES = getSeries(2);

const DEFAULT_VALUE = DEFAULT_SERIES.reduce<any>((acc, cur) => {
  acc.push(
    ...DEFAULT_DATE_LABEL.map((item, index) => {
      return {
        x: item,
        y: DEFAULT_DATE_VALUE[index],
        s: cur,
      };
    }),
  );
  return acc;
}, []);

const CUSTOM_CONFIG: ComponentData.TInternalComponentConfig<TLineBasicConfig> =
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
      legend: omit(DEFAULT_LEGEND_CONFIG, 'type'),
      xAxis: DEFAULT_X_AXIS_CONFIG,
      yAxis: DEFAULT_Y_AXIS_CONFIG,
      tooltip: DEFAULT_TOOLTIP_CONFIG,
      animation: {
        ...DEFAULT_ANIMATION_CONFIG,
        animationDuration: 2000,
        animationEasing: 'quadraticInOut',
      },
      series: {
        smooth: false,
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
          color: [],
          decal: [],
        },
        areaStyle: [],
        lineStyle: [],
      },
    },
  };

const DefaultConfig: ComponentData.TComponentData<TLineBasicConfig> =
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
