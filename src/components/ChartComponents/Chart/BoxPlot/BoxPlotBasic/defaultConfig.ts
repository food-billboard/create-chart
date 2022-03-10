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
  DEFAULT_ANIMATION_CONFIG,
} from '../../../Common/Constants/defaultConfig';
import { getDate, getNumberValue } from '@/utils/constants';
import { TBoxPlotBasicConfig } from './type';

const DEFAULT_DATE_LABEL = getDate(6);

export const DEFAULT_DECAL = {
  symbol: 'circle',
  symbolSize: 4,
};

export const DEFAULT_LINE_STYLE = {
  width: 1,
  type: 'solid',
};

const DEFAULT_VALUE = DEFAULT_DATE_LABEL.map((item, index) => {
  return {
    x: item,
    y: getNumberValue(5),
  };
});

const CUSTOM_CONFIG: ComponentData.TInternalComponentConfig<TBoxPlotBasicConfig> =
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
            type: 'number[]',
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
        boxWidth: [7, 50],
        itemStyle: [],
      },
    },
  };

const DefaultConfig: ComponentData.TComponentData<TBoxPlotBasicConfig> =
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
