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
} from '../../../Common/Constants/defaultConfig';
import { getDate, getNumberValue } from '@/utils/constants';
import { TBarBasicConfig } from './type';

const DEFAULT_DATE_LABEL = getDate(10);
const DEFAULT_DATE_VALUE = getNumberValue(10);

const DEFAULT_VALUE = DEFAULT_DATE_LABEL.map((item, index) => {
  return {
    x: item,
    y: DEFAULT_DATE_VALUE[index],
  };
});

const CUSTOM_CONFIG: ComponentData.TInternalComponentConfig<TBarBasicConfig> = {
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
    yAxis: merge({}, DEFAULT_Y_AXIS_CONFIG, {
      splitLine: {
        show: false,
        lineStyle: {
          width: 1,
          type: 'solid' as any,
          color: {
            r: 204,
            g: 204,
            b: 204,
          },
        },
      },
    }),
    tooltip: DEFAULT_TOOLTIP_CONFIG,
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
      },
      barGap: 1,
      barWidth: 'auto',
    },
    condition: [DEFAULT_CONDITION_CONFIG()],
  },
};

const DefaultConfig: ComponentData.TComponentData<TBarBasicConfig> =
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
