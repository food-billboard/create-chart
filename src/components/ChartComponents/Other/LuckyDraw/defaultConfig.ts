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
import { TLuckyDrawConfig } from './type';
import prizes1 from '../../../../../public/other/prizes-1.png';
import prizes2 from '../../../../../public/other/prizes-2.png';
import prizes3 from '../../../../../public/other/prizes-3.png';
import prizes4 from '../../../../../public/other/prizes-4.png';
import prizes5 from '../../../../../public/other/prizes-5.png';
import prizes6 from '../../../../../public/other/prizes-6.png';
import prizes7 from '../../../../../public/other/prizes-7.png';

const DEFAULT_VALUE = [
  {
    range: 5,
    title: '电影包场',
    img: prizes7,
  },
  {
    range: 10,
    title: '爆米花',
    img: prizes6,
  },
  {
    range: 20,
    title: '电影票',
    img: prizes5,
  },
  {
    range: 25,
    title: '100积分',
    img: prizes4,
  },
  {
    range: 30,
    title: '50积分',
    img: prizes3,
  },
  {
    range: 35,
    title: '20积分',
    img: prizes2,
  },
  {
    range: 35,
    title: '10积分',
    img: prizes1,
  },
];

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
              {
                key: 'range',
                variable: '',
                description: '中奖概率',
              },
              {
                key: 'img',
                variable: '',
                description: '奖品图片',
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
          content: '抽奖',
          textStyle: {
            ...DEFAULT_FONT_CONFIG,
            fontWeight: 'blod',
            fontSize: 16,
          },
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
