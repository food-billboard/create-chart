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
  DEFAULT_CONDITION_CONFIG,
  DEFAULT_THEME_RADIAL_COLOR_LIST,
  DEFAULT_GRID_CONFIG,
} from '../../../Common/Constants/defaultConfig';
import { getDate, getNumberValue, getSeries } from '@/utils/constants';
import { TRadialStackLineConfig } from './type';

const DEFAULT_DATE_LABEL = getDate(10);
const DEFAULT_SERIES = getSeries(2);

export const DEFAULT_DECAL = {
  symbol: 'circle',
  symbolSize: 4,
};

export const DEFAULT_LINE_STYLE = {
  width: 1,
  type: 'solid',
};

const DEFAULT_VALUE = DEFAULT_SERIES.reduce<any>((acc, cur) => {
  const DEFAULT_DATE_VALUE = getNumberValue(10);
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

export default () => {
  const CUSTOM_CONFIG: ComponentData.TInternalComponentConfig<TRadialStackLineConfig> =
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
            type: 'click-item',
            name: '点击项',
            show: false,
            description: '',
            value: '',
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
        condition: DEFAULT_CONDITION_CONFIG(),
        legend: omit(DEFAULT_LEGEND_CONFIG, 'type'),
        xAxis: {
          ...DEFAULT_X_AXIS_CONFIG,
        },
        yAxis: {
          ...DEFAULT_Y_AXIS_CONFIG,
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
          areaStyle: {
            color: DEFAULT_THEME_RADIAL_COLOR_LIST(),
          },
        },
      },
    };

  const DefaultConfig: ComponentData.TComponentData<TRadialStackLineConfig> =
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
