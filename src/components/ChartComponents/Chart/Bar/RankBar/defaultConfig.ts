import { mergeWithoutArray } from '@/utils';
import {
  BASIC_DEFAULT_CONFIG,
  BASIC_DEFAULT_DATA_CONFIG,
  BASIC_DEFAULT_INTERACTIVE_CONFIG,
  DEFAULT_TOOLTIP_CONFIG,
  DEFAULT_FONT_CONFIG,
  DEFAULT_ANIMATION_CONFIG,
  DEFAULT_CONDITION_CONFIG,
  DEFAULT_TOOLTIP_ANIMATION_CONFIG,
  DEFAULT_THEME_RADIAL_COLOR_LIST,
} from '../../../Common/Constants/defaultConfig';
import { getName, getNumberValue } from '@/utils/constants';
import { TRankBarConfig } from './type';

const DEFAULT_DATE_LABEL = getName(10);
const DEFAULT_DATE_VALUE = getNumberValue(10);

const DEFAULT_VALUE = DEFAULT_DATE_LABEL.map((item, index) => {
  return {
    name: item,
    value: DEFAULT_DATE_VALUE[index],
  };
});

const CUSTOM_CONFIG: ComponentData.TInternalComponentConfig<TRankBarConfig> = {
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
            description: '名称',
          },
          {
            key: 'value',
            variable: '',
            description: '值',
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
          field: 'name',
          map: '',
          description: '名称',
          id: 'name',
          type: 'string',
        },
        {
          field: 'value',
          map: '',
          description: '值',
          id: 'value',
          type: 'number',
        },
      ],
    },
  },
  options: {
    yAxis: {
      textStyle: {
        ...DEFAULT_FONT_CONFIG,
        fontSize: 16,
      },
      rankIcon: {
        show: true,
        textStyle: {
          ...DEFAULT_FONT_CONFIG,
          fontWeight: 'bold',
          fontSize: 16,
        },
        showBackground: true,
      },
    },
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
      backgroundStyle: {
        show: true,
        color: {
          r: 5,
          g: 50,
          b: 95,
          a: 0.7,
        },
      },
      itemStyle: {
        color: DEFAULT_THEME_RADIAL_COLOR_LIST.slice(0, 3).map((item) => {
          return {
            ...item,
            end: {
              ...item.end,
              a: 0.4,
            },
          };
        }),
        defaultColor: {
          ...DEFAULT_THEME_RADIAL_COLOR_LIST[3],
          end: {
            ...DEFAULT_THEME_RADIAL_COLOR_LIST[3].end,
            a: 0.6,
          },
        },
      },
      barWidth: 24,
      label: {
        show: true,
        ...DEFAULT_FONT_CONFIG,
        fontSize: 16,
        color: {
          r: 255,
          g: 255,
          b: 255,
        },
        formatter: '{c}',
        position: 'deep-top',
      },
      borderRadius: 30,
    },
    condition: [DEFAULT_CONDITION_CONFIG()],
  },
};

const DefaultConfig: ComponentData.TComponentData<TRankBarConfig> =
  mergeWithoutArray(
    {},
    {
      data: BASIC_DEFAULT_DATA_CONFIG,
      interactive: BASIC_DEFAULT_INTERACTIVE_CONFIG,
    },
    BASIC_DEFAULT_CONFIG,
    {
      style: {
        width: 800,
        height: 600,
      },
    },
    CUSTOM_CONFIG,
  );

export default DefaultConfig;
