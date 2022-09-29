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
  DEFAULT_TOOLTIP_ANIMATION_CONFIG,
} from '../../../Common/Constants/defaultConfig';
import { getName, getNumberValue } from '@/utils/constants';
import { TPieBasicConfig } from './type';

const DEFAULT_NAME_LABEL = getName(5);
const DEFAULT_DATE_VALUE = getNumberValue(5);

const DEFAULT_VALUE = DEFAULT_NAME_LABEL.map((item, index) => {
  return {
    name: item,
    value: DEFAULT_DATE_VALUE[index],
  };
});

export default () => {
  const CUSTOM_CONFIG: ComponentData.TInternalComponentConfig<TPieBasicConfig> =
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
                description: '数据项',
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
              description: '数据项',
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
          ],
        },
      },
      options: {
        condition: DEFAULT_CONDITION_CONFIG(),
        legend: omit(DEFAULT_LEGEND_CONFIG, 'type'),
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
          label: {
            show: false,
            position: 'outside',
            formatter: '{b}: {c}',
            ...DEFAULT_FONT_CONFIG,
            color: {
              r: 255,
              g: 255,
              b: 255,
            },
          },
          center: [50, 50],
          radius: 75,
          itemStyle: {
            color: [],
          },
          labelLine: {
            show: false,
            length: 15,
            length2: 15,
            smooth: false,
            lineStyle: {
              width: 1,
              type: 'solid',
            },
          },
        },
      },
    };

  const DefaultConfig: ComponentData.TComponentData<TPieBasicConfig> =
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
