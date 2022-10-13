import { omit } from 'lodash';
import { mergeWithoutArray } from '@/utils';
import {
  BASIC_DEFAULT_CONFIG,
  BASIC_DEFAULT_DATA_CONFIG,
  BASIC_DEFAULT_INTERACTIVE_CONFIG,
  DEFAULT_LEGEND_CONFIG,
  DEFAULT_FONT_CONFIG,
  DEFAULT_ANIMATION_CONFIG,
  DEFAULT_CONDITION_CONFIG,
  DEFAULT_LINKAGE_CONFIG,
} from '../../../Common/Constants/defaultConfig';
import ThemeUtil from '@/utils/Assist/Theme';
import { getDate, getNumberValue, getSeries } from '@/utils/constants';
import { TParallelBasicConfig } from './type';

export const DEFAULT_LINE_STYLE = {
  width: 1,
  type: 'solid',
};

const DEFAULT_DATE_LABEL = getDate(6);
const DEFAULT_SERIES = getSeries(3);

const DEFAULT_VALUE = DEFAULT_SERIES.reduce<any>((acc, cur) => {
  acc.push(
    ...DEFAULT_DATE_LABEL.map((item) => {
      const DEFAULT_DATE_VALUE = getNumberValue(10);
      return {
        x: item,
        y: DEFAULT_DATE_VALUE,
        s: cur,
      };
    }),
  );
  return acc;
}, []);

export default () => {
  const CUSTOM_CONFIG: ComponentData.TInternalComponentConfig<TParallelBasicConfig> =
    {
      interactive: {
        base: [],
        linkage: [
          {
            ...DEFAULT_LINKAGE_CONFIG,
            type: 'click',
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
              type: 'array[]',
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
        condition: DEFAULT_CONDITION_CONFIG(),
        legend: omit(DEFAULT_LEGEND_CONFIG, 'type'),
        animation: {
          ...DEFAULT_ANIMATION_CONFIG,
          animationDuration: 2000,
          animationEasing: 'quadraticInOut',
        },
        parallel: {
          left: 80,
          top: 60,
          right: 80,
          bottom: 60,
          layout: 'horizontal',
        },
        parallelAxis: {
          areaSelectStyle: {
            width: 20,
            color: {
              ...ThemeUtil.generateNextColor4CurrentTheme(0),
              a: 0.3,
            },
          },
          nameLocation: 'start',
          nameTextStyle: {
            ...DEFAULT_FONT_CONFIG,
          },
          nameGap: 15,
          nameRotate: 0,
          axisLine: {
            show: true,
            lineStyle: {
              width: 1,
              type: 'solid',
              color: {
                r: 255,
                g: 255,
                b: 255,
              },
            },
          },
          axisLabel: {
            show: true,
            rotate: 0,
            margin: 8,
            ...DEFAULT_FONT_CONFIG,
          },
        },
        series: {
          smooth: false,
          lineStyle: [],
        },
      },
    };

  const DefaultConfig: ComponentData.TComponentData<TParallelBasicConfig> =
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
  convert: (colorList: string[], options: TParallelBasicConfig) => {
    return {
      parallelAxis: {
        areaSelectStyle: {
          color: {
            ...ThemeUtil.generateNextColor4CurrentTheme(0),
            a: options.parallelAxis.areaSelectStyle.color.a,
          },
        },
      },
      series: {
        lineStyle: options.series.lineStyle.map((item, index) => {
          return {
            ...item,
            color: ThemeUtil.generateNextColor4CurrentTheme(index),
          };
        }),
      },
    };
  },
};
