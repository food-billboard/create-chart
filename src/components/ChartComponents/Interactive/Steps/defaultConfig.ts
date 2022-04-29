import { mergeWithoutArray } from '@/utils';
import {
  BASIC_DEFAULT_CONFIG,
  BASIC_DEFAULT_DATA_CONFIG,
  BASIC_DEFAULT_INTERACTIVE_CONFIG,
  DEFAULT_FONT_CONFIG,
} from '../../Common/Constants/defaultConfig';
import { getName } from '@/utils/constants';
import ThemeUtil from '@/utils/Assist/Theme';
import { TStepsConfig } from './type';

const DEFAULT_NAME_LABEL = getName(3);

const DEFAULT_VALUE = DEFAULT_NAME_LABEL.map((item) => ({
  name: item,
  value: item,
}));

export default () => {
  const CUSTOM_CONFIG: ComponentData.TInternalComponentConfig<TStepsConfig> = {
    interactive: {
      base: [
        {
          type: 'select',
          name: '当选中项时',
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
            id: 'title',
            type: 'string',
          },
          {
            field: 'status',
            map: '',
            description: '状态',
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
      direction: 'horizontal',
      labelPlacement: 'vertical',
      icons: [
        {
          wait: 'bi-emoji-neutral',
          finish: 'bi-emoji-smile',
          error: 'bi-emoji-frown',
          progress: 'bi-emoji-wink',
        },
      ],
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
        progress: {
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
          width: 300,
          height: 100,
        },
      },
      CUSTOM_CONFIG,
    );

  return DefaultConfig;
};
