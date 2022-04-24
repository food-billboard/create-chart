import { merge } from 'lodash';
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
  DEFAULT_THEME_COLOR_LIST,
} from '../../../Common/Constants/defaultConfig';
import { getDate, getNumberValue, getSeries } from '@/utils/constants';
import { TStackBarConfig } from './type';

const DEFAULT_DATE_LABEL = getDate(5);
const [DEFAULT_STACK] = getSeries(1);
const DEFAULT_SERIES = getSeries(4);

const DEFAULT_VALUE = DEFAULT_DATE_LABEL.reduce<any>((acc, x) => {
  acc.push(
    ...DEFAULT_SERIES.map((item, index) => {
      const [target] = getNumberValue(1, 20, 100);
      if (index === 3)
        return {
          x,
          y: 300,
          s: item,
        };
      return {
        x,
        y: target,
        s: item,
        stack: DEFAULT_STACK,
      };
    }),
  );
  return acc;
}, []);

export default () => {
  const CUSTOM_CONFIG: ComponentData.TInternalComponentConfig<TStackBarConfig> =
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
            {
              field: 'stack',
              map: '',
              description: '不同系列的同级',
              id: 'stack',
              type: 'string',
            },
          ],
        },
      },
      options: {
        legend: DEFAULT_LEGEND_CONFIG,
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
        tooltip: {
          ...DEFAULT_TOOLTIP_CONFIG,
          animation: DEFAULT_TOOLTIP_ANIMATION_CONFIG,
        },
        animation: {
          ...DEFAULT_ANIMATION_CONFIG,
          animationDuration: 2000,
          animationEasing: 'elasticOut',
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
          itemStyle: DEFAULT_THEME_COLOR_LIST()
            .slice(0, 4)
            .map((item, index) => {
              return {
                color: item,
                barWidth: index === 3 ? 5 : 20,
              };
            }),
        },
        condition: [DEFAULT_CONDITION_CONFIG()],
      },
    };

  const DefaultConfig: ComponentData.TComponentData<TStackBarConfig> =
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
