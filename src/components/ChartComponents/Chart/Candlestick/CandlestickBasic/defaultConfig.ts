import { omit } from 'lodash';
import { mergeWithoutArray } from '@/utils';
import {
  BASIC_DEFAULT_CONFIG,
  BASIC_DEFAULT_DATA_CONFIG,
  BASIC_DEFAULT_INTERACTIVE_CONFIG,
  DEFAULT_X_AXIS_CONFIG,
  DEFAULT_Y_AXIS_CONFIG,
  DEFAULT_TOOLTIP_CONFIG,
  DEFAULT_FONT_CONFIG,
  DEFAULT_ANIMATION_CONFIG,
  DEFAULT_LABEL_CONFIG,
  DEFAULT_CONDITION_CONFIG,
  DEFAULT_TOOLTIP_ANIMATION_CONFIG,
  DEFAULT_GRID_CONFIG,
} from '../../../Common/Constants/defaultConfig';
import { getDate, getNumberValue } from '@/utils/constants';
import { TCandlestickBasicConfig } from './type';

const DEFAULT_DATE_LABEL = getDate(10);

const DEFAULT_MARK_LINE_ITEM_CONFIG = {
  show: false,
  label: {
    ...omit(DEFAULT_LABEL_CONFIG, ['position']),
    formatter: '{c}',
  },
  lineStyle: {
    width: 1,
    type: 'dashed',
    color: {
      r: 233,
      g: 85,
      b: 88,
    },
  },
};

const DEFAULT_VALUE = DEFAULT_DATE_LABEL.map((item) => {
  const DEFAULT_DATE_VALUE = getNumberValue(4);
  return {
    x: item,
    y: DEFAULT_DATE_VALUE,
  };
});

export default () => {
  const CUSTOM_CONFIG: ComponentData.TInternalComponentConfig<TCandlestickBasicConfig> =
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
          ],
        },
      },
      options: {
        xAxis: {
          ...DEFAULT_X_AXIS_CONFIG,
        },
        yAxis: {
          ...DEFAULT_Y_AXIS_CONFIG,
        },
        grid: {
          ...DEFAULT_GRID_CONFIG,
        },
        condition: [DEFAULT_CONDITION_CONFIG()],
        tooltip: {
          ...DEFAULT_TOOLTIP_CONFIG,
          animation: DEFAULT_TOOLTIP_ANIMATION_CONFIG,
        },
        animation: {
          ...DEFAULT_ANIMATION_CONFIG,
          animationDuration: 2000,
          animationEasing: 'quadraticInOut',
        },
        series: {
          barWidth: 10,
          itemStyle: {
            color: {
              r: 233,
              g: 85,
              b: 88,
            },
            color0: {
              r: 76,
              g: 177,
              b: 101,
            },
            borderWidth: 1,
            borderType: 'solid',
            borderColor: {
              r: 233,
              g: 85,
              b: 88,
            },
            borderColor0: {
              r: 76,
              g: 177,
              b: 101,
            },
          },
          markPoint: ['max', 'min', 'average'].reduce((counter, current) => {
            counter[current] = {
              show: false,
              symbol: 'pin',
              symbolSize: 50,
              symbolRotate: 0,
              label: {
                show: true,
                distance: 5,
                formatter: '{b}: {@score}',
                ...DEFAULT_FONT_CONFIG,
                position: 'inside',
              },
              itemStyle: {
                color: {
                  r: 233,
                  g: 85,
                  b: 88,
                },
              },
            };
            return counter;
          }, {} as any),
          markLine: {
            data: ['max', 'min', 'average', 'median'].reduce(
              (counter, current) => {
                counter[current] = DEFAULT_MARK_LINE_ITEM_CONFIG;
                return counter;
              },
              {} as any,
            ),
          },
        },
      },
    };

  const DefaultConfig: ComponentData.TComponentData<TCandlestickBasicConfig> =
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
