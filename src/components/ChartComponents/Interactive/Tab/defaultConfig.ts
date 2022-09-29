import { mergeWithoutArray } from '@/utils';
import {
  BASIC_DEFAULT_CONFIG,
  BASIC_DEFAULT_DATA_CONFIG,
  BASIC_DEFAULT_INTERACTIVE_CONFIG,
  DEFAULT_FONT_CONFIG,
} from '../../Common/Constants/defaultConfig';
import { getName } from '@/utils/constants';
import ThemeUtil from '@/utils/Assist/Theme';
import { TTabConfig } from './type';

const DEFAULT_NAME_LABEL = getName(3);

const DEFAULT_VALUE = DEFAULT_NAME_LABEL.map((item) => ({
  name: item,
  value: item,
}));

export default () => {
  const CUSTOM_CONFIG: ComponentData.TInternalComponentConfig<TTabConfig> = {
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
              description: '数据值',
            },
            {
              key: 'name',
              variable: '',
              description: '数据名',
            },
          ],
        },
        {
          type: 'loop',
          name: '当项改变时',
          show: false,
          fields: [
            {
              key: 'value',
              variable: '',
              description: '数据值',
            },
            {
              key: 'name',
              variable: '',
              description: '数据名',
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
            description: '数据名',
            id: 'value',
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
      base: {
        textStyle: {
          ...DEFAULT_FONT_CONFIG,
          fontSize: 24,
        },
        backgroundColor: {
          r: 0,
          g: 0,
          b: 0,
        },
        border: {
          type: 'solid',
          width: 1,
          color: {
            r: 255,
            g: 255,
            b: 255,
          },
        },
      },
      active: {
        textStyle: {
          ...DEFAULT_FONT_CONFIG,
          color: ThemeUtil.generateNextColor4CurrentTheme(0),
          fontSize: 24,
          fontWeight: 'bold',
        },
        backgroundColor: {
          r: 0,
          g: 0,
          b: 0,
        },
        border: {
          type: 'solid',
          width: 1,
          color: ThemeUtil.generateNextColor4CurrentTheme(0),
        },
      },
      loop: {
        show: false,
        speed: 3000,
      },
    },
  };

  const DefaultConfig: ComponentData.TComponentData<TTabConfig> =
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
          height: 60,
          zIndex: 3,
        },
      },
      CUSTOM_CONFIG,
    );

  return DefaultConfig;
};
