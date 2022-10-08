import { mergeWithoutArray } from '@/utils';
import {
  BASIC_DEFAULT_CONFIG,
  BASIC_DEFAULT_DATA_CONFIG,
  BASIC_DEFAULT_INTERACTIVE_CONFIG,
  DEFAULT_FONT_CONFIG,
  DEFAULT_CONDITION_CONFIG,
  DEFAULT_LINKAGE_CONFIG,
  DEFAULT_THEME_COLOR_LIST,
} from '../../Common/Constants/defaultConfig';
import ThemeUtil from '@/utils/Assist/Theme';
import { TLuckyDrawConfig } from './type';

const DEFAULT_VALUE = new Array(20).fill({
  range: 10,
  title: '奖品名字',
  img: '图片地址',
});

export default () => {
  const colorList = DEFAULT_THEME_COLOR_LIST();
  const CUSTOM_CONFIG: ComponentData.TInternalComponentConfig<TLuckyDrawConfig> =
    {
      interactive: {
        base: [
          {
            type: 'end',
            name: '当抽奖结束时',
            show: false,
            fields: [
              {
                key: 'title',
                variable: '',
                description: '奖品名字',
              },
            ],
          },
        ],
        linkage: [
          {
            ...DEFAULT_LINKAGE_CONFIG,
            type: 'click',
            name: '点击抽奖',
          },
        ],
      },
      data: {
        request: {
          value: DEFAULT_VALUE,
          valueType: 'array',
        },
        filter: {
          map: [
            {
              field: 'title',
              map: '',
              description: '奖品名称',
              id: 'title',
              type: 'string',
            },
            {
              field: 'img',
              map: '',
              description: '奖品图片',
              id: 'img',
              type: 'string',
            },
            {
              field: 'range',
              map: '',
              description: '中奖概率',
              id: 'range',
              type: 'string',
            },
          ],
        },
      },
      options: {
        condition: DEFAULT_CONDITION_CONFIG(),
        global: {
          style: {
            ...DEFAULT_FONT_CONFIG,
            background: colorList[0],
          },
          config: {
            // 建议配置范围 10 ~ 30
            speed: 20,
          },
        },
        buttons: {
          type: 'custom_1',
        },
        prizes: {
          config: colorList.map((item) => {
            return {
              background: item,
            };
          }),
          size: {
            width: 40,
            height: 40,
          },
        },
        blocks: {
          type: 'custom_1',
        },
      },
    };

  const DefaultConfig: ComponentData.TComponentData<TLuckyDrawConfig> =
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
          height: 600,
        },
      },
      CUSTOM_CONFIG,
    );

  return DefaultConfig;
};
