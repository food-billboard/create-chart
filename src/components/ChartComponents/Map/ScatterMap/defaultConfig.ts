import { omit } from 'lodash';
import { mergeWithoutArray } from '@/utils';
import {
  BASIC_DEFAULT_CONFIG,
  BASIC_DEFAULT_DATA_CONFIG,
  BASIC_DEFAULT_INTERACTIVE_CONFIG,
  DEFAULT_TOOLTIP_CONFIG,
  DEFAULT_CONDITION_CONFIG,
  DEFAULT_TOOLTIP_ANIMATION_CONFIG,
  DEFAULT_LABEL_CONFIG,
  DEFAULT_THEME_RADIAL_COLOR_LIST,
} from '../../Common/Constants/defaultConfig';
import ThemeUtil from '@/utils/Assist/Theme';
import { TScatterMapConfig } from './type';

const DEFAULT_VALUE = [
  {
    center: [116.46, 39.92],
    value: 20,
    name: '北京',
  },
  {
    center: [117.2, 39.13],
    value: 30,
    name: '天津',
  },
];

export default () => {
  const DEFAULT_THEME_RADIAL_COLOR_LIST_DATA =
    DEFAULT_THEME_RADIAL_COLOR_LIST();
  const CUSTOM_CONFIG: ComponentData.TInternalComponentConfig<TScatterMapConfig> =
    {
      interactive: {
        base: [
          {
            type: 'click',
            name: '当点击项时',
            show: false,
            fields: [
              {
                key: 'name',
                variable: '',
                description: '地理名称',
              },
              {
                key: 'center',
                variable: '',
                description: '地理坐标',
              },
              {
                key: 'value',
                variable: '',
                description: '数值',
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
              field: 'name',
              map: '',
              description: '地理名称',
              id: 'name',
              type: 'string',
            },
            {
              field: 'center',
              map: '',
              description: '地理坐标',
              id: 'center',
              type: 'number[]',
            },
            {
              field: 'value',
              map: '',
              description: '数值',
              id: 'value',
              type: 'number',
            },
          ],
        },
      },
      options: {
        tooltip: {
          ...DEFAULT_TOOLTIP_CONFIG(),
          animation: DEFAULT_TOOLTIP_ANIMATION_CONFIG,
        },
        geo: {
          center: [115.97, 29.71],
          itemStyle: {
            normal: {
              borderColor: ThemeUtil.generateNextColor4CurrentTheme(0),
              borderWidth: 1,
              areaColor: {
                ...DEFAULT_THEME_RADIAL_COLOR_LIST_DATA[0],
                start: DEFAULT_THEME_RADIAL_COLOR_LIST_DATA[0].end,
                end: DEFAULT_THEME_RADIAL_COLOR_LIST_DATA[0].start,
                type: 'radial',
                radialPosition: {
                  x: 0.5,
                  y: 0.5,
                  r: 5,
                },
              },
              shadowColor: ThemeUtil.generateNextColor4CurrentTheme(0),
              shadowOffsetX: -2,
              shadowOffsetY: 2,
              shadowBlur: 10,
            },
            emphasis: {
              borderColor: ThemeUtil.generateNextColor4CurrentTheme(0),
              borderWidth: 1,
              areaColor: DEFAULT_THEME_RADIAL_COLOR_LIST_DATA[0],
              shadowColor: ThemeUtil.generateNextColor4CurrentTheme(0),
              shadowOffsetX: -2,
              shadowOffsetY: 2,
              shadowBlur: 10,
            },
          },
        },
        scatter: {
          effectType: 'ripple',
          rippleEffect: {
            color: ThemeUtil.generateNextColor4CurrentTheme(3),
            number: 3,
            period: 3,
            scale: 3,
            brushType: 'stroke',
          },
          label: {
            ...omit(DEFAULT_LABEL_CONFIG, 'position'),
            formatter: '{b}',
          },
          symbol: 'circle',
          symbolSize: 1,
          itemStyle: {
            color: ThemeUtil.generateNextColor4CurrentTheme(3),
          },
        },
        condition: DEFAULT_CONDITION_CONFIG(),
      },
    };

  const DefaultConfig: ComponentData.TComponentData<TScatterMapConfig> =
    mergeWithoutArray(
      {},
      {
        data: BASIC_DEFAULT_DATA_CONFIG,
        interactive: BASIC_DEFAULT_INTERACTIVE_CONFIG,
      },
      BASIC_DEFAULT_CONFIG,
      {
        style: {
          width: 600,
          height: 600,
        },
      },
      CUSTOM_CONFIG,
    );
  return DefaultConfig;
};
