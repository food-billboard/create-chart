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
  DEFAULT_TOOLTIP_ANIMATION_CONFIG,
  DEFAULT_GRID_CONFIG,
} from '../../../Common/Constants/defaultConfig';
import ThemeUtil from '@/utils/Assist/Theme';
import { getDate, getNumberValue } from '@/utils/constants';
import { TNegativeBarConfig } from './type';

const DEFAULT_DATE_LABEL = getDate(5);
const DEFAULT_DATE_VALUE = new Array(5).fill(0).map((_) => {
  return [getNumberValue(1, -100, -10), getNumberValue(1, 10, 100)].flat(1);
});

const DEFAULT_VALUE = DEFAULT_DATE_LABEL.map((item, index) => {
  return {
    x: item,
    y: DEFAULT_DATE_VALUE[index],
  };
});

export default () => {
  const CUSTOM_CONFIG: ComponentData.TInternalComponentConfig<TNegativeBarConfig> =
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
            name: '点击柱子',
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
        grid: {
          ...DEFAULT_GRID_CONFIG,
        },
        legend: omit(DEFAULT_LEGEND_CONFIG, 'type'),
        xAxis: merge({}, DEFAULT_X_AXIS_CONFIG, {
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
          } as any,
        }),
        yAxis: {
          ...DEFAULT_Y_AXIS_CONFIG,
        },
        tooltip: {
          ...DEFAULT_TOOLTIP_CONFIG(),
          animation: DEFAULT_TOOLTIP_ANIMATION_CONFIG,
        },
        animation: {
          ...DEFAULT_ANIMATION_CONFIG,
          animationDuration: 2000,
          animationEasing: 'quadraticInOut',
        },
        series: {
          itemStyle: {
            color: [],
          },
          barWidth: 'auto',
          label: [
            {
              show: true,
              ...DEFAULT_FONT_CONFIG,
              color: {
                r: 255,
                g: 255,
                b: 255,
              },
              formatter: '{c}',
              position: 'inside',
            },
            {
              show: true,
              ...DEFAULT_FONT_CONFIG,
              color: {
                r: 255,
                g: 255,
                b: 255,
              },
              formatter: '{c}',
              position: 'inside',
            },
          ],
        },
        condition: DEFAULT_CONDITION_CONFIG(),
      },
    };

  const DefaultConfig: ComponentData.TComponentData<TNegativeBarConfig> =
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
          height: 300,
        },
      },
      CUSTOM_CONFIG,
    );
  return DefaultConfig;
};
