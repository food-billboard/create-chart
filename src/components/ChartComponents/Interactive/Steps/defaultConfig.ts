import { mergeWithoutArray } from '@/utils';
import {
  BASIC_DEFAULT_CONFIG,
  BASIC_DEFAULT_DATA_CONFIG,
  BASIC_DEFAULT_INTERACTIVE_CONFIG,
  DEFAULT_FONT_CONFIG,
  DEFAULT_LINKAGE_CONFIG,
} from '../../Common/Constants/defaultConfig';
import { getName, getText } from '@/utils/constants';
import ThemeUtil from '@/utils/Assist/Theme';
import { TStepsConfig } from './type';

const DEFAULT_TITLE_LABEL = getName(3);
const DEFAULT_SUB_TITLE_LABEL = getName(3);
const DEFAULT_DESCRIPTION = getText(3, 20, 30);
const DEFAULT_STATUS = ['finish', 'finish', 'wait'];

const DEFAULT_VALUE = DEFAULT_TITLE_LABEL.map((item, index) => ({
  title: item,
  subTitle: DEFAULT_SUB_TITLE_LABEL[index],
  description: DEFAULT_DESCRIPTION[index],
  status: DEFAULT_STATUS[index],
}));

export const DEFAULT_ICON = {
  wait: 'bi-emoji-neutral',
  finish: 'bi-emoji-smile',
  error: 'bi-emoji-frown',
  process: 'bi-emoji-wink',
};

export default () => {
  const CUSTOM_CONFIG: ComponentData.TInternalComponentConfig<TStepsConfig> = {
    interactive: {
      base: [
        {
          type: 'click',
          name: '当点击项时',
          show: false,
          fields: [
            {
              key: 'title',
              variable: '',
              description: '标题',
            },
            {
              key: 'subTitle',
              variable: '',
              description: '副标题',
            },
            {
              key: 'description',
              variable: '',
              description: '描述',
            },
            {
              key: 'status',
              variable: '',
              description: '状态',
            },
          ],
        },
        {
          type: 'carousel',
          name: '当轮播改变时',
          show: false,
          fields: [
            {
              key: 'title',
              variable: '',
              description: '标题',
            },
            {
              key: 'subTitle',
              variable: '',
              description: '副标题',
            },
            {
              key: 'description',
              variable: '',
              description: '描述',
            },
            {
              key: 'status',
              variable: '',
              description: '状态',
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
            field: 'title',
            map: '',
            description: '标题',
            id: 'title',
            type: 'string',
          },
          {
            field: 'subTitle',
            map: '',
            description: '副标题',
            id: 'subTitle',
            type: 'string',
          },
          {
            field: 'description',
            map: '',
            description: '描述',
            id: 'description',
            type: 'string',
          },
          {
            field: 'status',
            map: '',
            description: '状态（wait process finish error）',
            id: 'status',
            type: 'string',
          },
        ],
      },
    },
    options: {
      click: {
        show: false,
      },
      defaultCurrent: 1,
      carousel: {
        show: false,
        loop: true,
        speed: 5000,
      },
      direction: 'horizontal',
      labelPlacement: 'vertical',
      size: 48,
      icons: new Array(3).fill({
        ...DEFAULT_ICON,
      }),
      style: {
        finish: {
          textStyle: {
            ...DEFAULT_FONT_CONFIG,
            color: ThemeUtil.generateNextColor4CurrentTheme(0),
          },
          lineStyle: {
            color: ThemeUtil.generateNextColor4CurrentTheme(0),
          },
        },
        process: {
          textStyle: {
            ...DEFAULT_FONT_CONFIG,
            color: ThemeUtil.generateNextColor4CurrentTheme(0),
          },
          lineStyle: {
            color: ThemeUtil.generateNextColor4CurrentTheme(0),
          },
        },
        wait: {
          textStyle: {
            ...DEFAULT_FONT_CONFIG,
            color: {
              r: 255,
              g: 255,
              b: 255,
              a: 0.45,
            },
          },
          lineStyle: {
            color: {
              r: 20,
              g: 20,
              b: 20,
            },
          },
        },
        error: {
          textStyle: {
            ...DEFAULT_FONT_CONFIG,
            color: {
              r: 255,
              g: 85,
              b: 0,
            },
          },
          lineStyle: {
            color: {
              r: 255,
              g: 85,
              b: 0,
            },
          },
        },
      },
    },
  };

  const DefaultConfig: ComponentData.TComponentData<TStepsConfig> =
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
          height: 300,
        },
      },
      CUSTOM_CONFIG,
    );

  return DefaultConfig;
};
