import { mergeWithoutArray } from '@/utils';
import {
  BASIC_DEFAULT_CONFIG,
  BASIC_DEFAULT_DATA_CONFIG,
  BASIC_DEFAULT_INTERACTIVE_CONFIG,
  DEFAULT_FONT_CONFIG,
  DEFAULT_CONDITION_CONFIG,
  DEFAULT_THEME_COLOR_LIST,
} from '../../Common/Constants/defaultConfig';
import { getText } from '@/utils/constants';
import { TTagConfig } from './type';

const DEFAULT_TEXT = getText(4);

const DEFAULT_VALUE = DEFAULT_TEXT.map((item) => {
  return {
    value: item,
  };
});

export default () => {
  const CUSTOM_CONFIG: ComponentData.TInternalComponentConfig<TTagConfig> = {
    interactive: {
      base: [
        {
          type: 'click',
          name: '当点击项时',
          show: false,
          fields: [
            {
              key: 'value',
              variable: '',
              description: '内容',
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
            field: 'icon',
            map: '',
            description: '图标',
            id: 'icon',
            type: 'string',
          },
          {
            field: 'value',
            map: '',
            description: '内容',
            id: 'value',
            type: 'string',
          },
        ],
      },
    },
    options: {
      condition: [DEFAULT_CONDITION_CONFIG()],
      margin: 8,
      textStyle: {
        ...DEFAULT_FONT_CONFIG,
      },
      series: DEFAULT_THEME_COLOR_LIST().map((item) => {
        return {
          color: item,
        };
      }),
      icon: {
        position: 'start',
        margin: 8,
      },
    },
  };

  const DefaultConfig: ComponentData.TComponentData<TTagConfig> =
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
          height: 200,
        },
      },
      CUSTOM_CONFIG,
    );

  return DefaultConfig;
};
