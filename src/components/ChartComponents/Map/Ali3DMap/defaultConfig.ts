import { omit } from 'lodash';
import { mergeWithoutArray } from '@/utils';
import ThemeUtil from '@/utils/Assist/Theme';
import {
  BASIC_DEFAULT_CONFIG,
  BASIC_DEFAULT_DATA_CONFIG,
  BASIC_DEFAULT_INTERACTIVE_CONFIG,
  DEFAULT_TOOLTIP_CONFIG,
  DEFAULT_CONDITION_CONFIG,
  DEFAULT_TOOLTIP_ANIMATION_CONFIG,
  DEFAULT_THEME_COLOR_LIST,
} from '../../Common/Constants/defaultConfig';
import { TAli3DMapConfig } from './type';

const DEFAULT_VALUE: any = {
  center: [120.8, 30.14],
  pointer: [
    {
      image: 'http://tpc.googlesyndication.com/simgad/5843493769827749134',
      title: '这是一串标题',
      subTitle: '这是一串副标题',
      description: '这是一串描述'.repeat(5),
      position: [120.8, 30.14],
      topTitle: '这是顶部的标题',
    },
    {
      image: 'http://tpc.googlesyndication.com/simgad/5843493769827749134',
      title: '这是一串标题',
      subTitle: '这是一串副标题',
      description: '这是一串描述'.repeat(5),
      position: [120.7, 30.1],
      topTitle: '这是顶部的标题',
    },
  ],
};

export default () => {
  const DEFAULT_THEME_COLOR_LIST_DATA = DEFAULT_THEME_COLOR_LIST();
  const CUSTOM_CONFIG: ComponentData.TInternalComponentConfig<TAli3DMapConfig> =
    {
      interactive: {
        base: [
          {
            type: 'click',
            name: '当点击坐标时',
            show: false,
            fields: [
              {
                key: 'position',
                variable: '',
                description: '标记点',
              },
            ],
          },
          {
            type: 'modal-show',
            name: '当模态框显示时',
            show: false,
            fields: [
              {
                key: 'image',
                variable: '',
                description: '图片',
              },
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
                key: 'position',
                variable: '',
                description: '坐标点',
              },
              {
                key: 'topTitle',
                variable: '',
                description: '模态框标题',
              },
            ],
          },
        ],
      },
      data: {
        request: {
          value: DEFAULT_VALUE,
          valueType: 'object',
        },
        filter: {
          map: [
            {
              field: 'center',
              map: '',
              description: '中心点',
              id: 'center',
              type: 'number[]',
            },
            {
              field: 'pointer',
              map: '',
              description: '标记点',
              id: 'pointer',
              type: 'array[]',
            },
          ],
        },
      },
      options: {
        style: 'normal',
        zoom: 10,
        tooltip: {
          ...omit(DEFAULT_TOOLTIP_CONFIG(), ['formatter']),
          backgroundColor: ThemeUtil.generateNextColor4CurrentTheme(0),
          animation: DEFAULT_TOOLTIP_ANIMATION_CONFIG,
          ignore: [],
        },
        scatter: {
          color: DEFAULT_THEME_COLOR_LIST_DATA[0],
        },
        condition: DEFAULT_CONDITION_CONFIG(),
      },
    };

  const DefaultConfig: ComponentData.TComponentData<TAli3DMapConfig> =
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

export const themeConfig = {
  convert: (colorList: string[]) => {
    return {
      tooltip: {
        backgroundColor: ThemeUtil.generateNextColor4CurrentTheme(0),
      },
      scatter: {
        color: ThemeUtil.generateNextColor4CurrentTheme(0),
      },
    };
  },
};
