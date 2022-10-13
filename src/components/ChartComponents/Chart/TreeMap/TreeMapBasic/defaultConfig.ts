import { mergeWithoutArray } from '@/utils';
import {
  BASIC_DEFAULT_CONFIG,
  BASIC_DEFAULT_DATA_CONFIG,
  BASIC_DEFAULT_INTERACTIVE_CONFIG,
  DEFAULT_TOOLTIP_CONFIG,
  DEFAULT_FONT_CONFIG,
  DEFAULT_ANIMATION_CONFIG,
  DEFAULT_CONDITION_CONFIG,
  DEFAULT_LINKAGE_CONFIG,
} from '../../../Common/Constants/defaultConfig';
import { getName, getNumberValue } from '@/utils/constants';
import { TTreeMapBasicConfig } from './type';

function generateList(count = 10): any {
  return new Array(count).fill(0).map((item) => {
    const [name] = getName(1);
    const [value] = getNumberValue(1);
    const number = Math.random();
    const [nextCount] = getNumberValue(1, 1, 5);
    return {
      name,
      value,
      children: number > 0.8 ? generateList(Math.round(nextCount)) : [],
    };
  });
}

const DEFAULT_VALUE = generateList();

export default () => {
  const CUSTOM_CONFIG: ComponentData.TInternalComponentConfig<TTreeMapBasicConfig> =
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
            {
              field: 'children',
              map: '',
              description: '子项',
              id: 'children',
              type: 'array[]',
            },
          ],
        },
      },
      options: {
        condition: DEFAULT_CONDITION_CONFIG(),
        tooltip: {
          ...DEFAULT_TOOLTIP_CONFIG(),
        },
        animation: {
          ...DEFAULT_ANIMATION_CONFIG,
          animationDuration: 2000,
          animationEasing: 'quadraticInOut',
        },
        series: {
          nodeClick: 'zoomToNode',
          // 黄金比例
          squareRatio: 0.5 * (1 + Math.sqrt(5)),
          label: {
            show: true,
            formatter: '{b}',
            ...DEFAULT_FONT_CONFIG,
            color: {
              r: 255,
              g: 255,
              b: 255,
            },
          },
          upperLabel: {
            show: false,
            position: 'inside',
            formatter: '{b}',
            ...DEFAULT_FONT_CONFIG,
            color: {
              r: 255,
              g: 255,
              b: 255,
            },
          },
          breadcrumb: {
            show: true,
            left: 'center',
            top: 'bottom',
            itemStyle: {
              textStyle: {
                ...DEFAULT_FONT_CONFIG,
                color: {
                  r: 255,
                  g: 255,
                  b: 255,
                },
              },
              color: {
                r: 0,
                g: 0,
                b: 0,
                a: 0,
              },
            },
          },
        },
      },
    };

  const DefaultConfig: ComponentData.TComponentData<TTreeMapBasicConfig> =
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
