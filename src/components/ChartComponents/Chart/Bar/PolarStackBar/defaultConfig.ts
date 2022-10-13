import { omit } from 'lodash';
import { mergeWithoutArray } from '@/utils';
import {
  BASIC_DEFAULT_CONFIG,
  BASIC_DEFAULT_DATA_CONFIG,
  BASIC_DEFAULT_INTERACTIVE_CONFIG,
  DEFAULT_LEGEND_CONFIG,
  DEFAULT_TOOLTIP_CONFIG,
  DEFAULT_FONT_CONFIG,
  DEFAULT_ANIMATION_CONFIG,
  DEFAULT_CONDITION_CONFIG,
  DEFAULT_LINKAGE_CONFIG,
} from '../../../Common/Constants/defaultConfig';
import { getName, getNumberValue } from '@/utils/constants';
import { TPolarStackBarConfig } from './type';

const DEFAULT_DATE_LABEL = getName(5);
const DEFAULT_DATE_VALUE_STACK_ONE = getNumberValue(5, 0, 100);
const DEFAULT_DATE_VALUE_STACK_TWO = getNumberValue(5, 0, 100);
const DEFAULT_DATE_VALUE_STACK_THREE = getNumberValue(5, 0, 100);

const DEFAULT_VALUE = DEFAULT_DATE_LABEL.reduce<any>((acc, item, index) => {
  acc.push(
    {
      name: item,
      value: DEFAULT_DATE_VALUE_STACK_ONE[index],
      stack: 'stack1',
    },
    {
      name: item,
      value: DEFAULT_DATE_VALUE_STACK_TWO[index],
      stack: 'stack2',
    },
    {
      name: item,
      value: DEFAULT_DATE_VALUE_STACK_THREE[index],
      stack: 'stack3',
    },
  );
  return acc;
}, []);

export default () => {
  const CUSTOM_CONFIG: ComponentData.TInternalComponentConfig<TPolarStackBarConfig> =
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
                description: '数据名',
              },
              {
                key: 'value',
                variable: '',
                description: '数据值',
              },
            ],
          },
        ],
        linkage: [
          {
            ...DEFAULT_LINKAGE_CONFIG,
            type: 'click-item',
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
              field: 'name',
              map: '',
              description: '角度轴',
              id: 'name',
              type: 'string',
            },
            {
              field: 'value',
              map: '',
              description: '数据值',
              id: 'value',
              type: 'number',
            },
            {
              field: 'stack',
              map: '',
              description: '数据栈',
              id: 'stack',
              type: 'string',
            },
          ],
        },
      },
      options: {
        polar: {
          radius: [0, 60],
        },
        angleAxis: {
          axisLabel: {
            ...DEFAULT_FONT_CONFIG,
            show: true,
            margin: 8,
          },
        },
        legend: omit(DEFAULT_LEGEND_CONFIG, 'type'),
        tooltip: {
          ...DEFAULT_TOOLTIP_CONFIG(),
        },
        animation: {
          ...DEFAULT_ANIMATION_CONFIG,
          animationDuration: 2000,
          animationEasing: 'quadraticInOut',
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
          itemStyle: {
            color: [],
          },
        },
        condition: DEFAULT_CONDITION_CONFIG(),
      },
    };

  const DefaultConfig: ComponentData.TComponentData<TPolarStackBarConfig> =
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
  cover: (colorList: string[]) => {},
};
