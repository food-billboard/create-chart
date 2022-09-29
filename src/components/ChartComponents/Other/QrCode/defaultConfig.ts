import { mergeWithoutArray } from '@/utils';
import ThemeUtil from '@/utils/Assist/Theme';
import {
  BASIC_DEFAULT_CONFIG,
  BASIC_DEFAULT_DATA_CONFIG,
  BASIC_DEFAULT_INTERACTIVE_CONFIG,
  DEFAULT_CONDITION_CONFIG,
} from '../../Common/Constants/defaultConfig';
import { TQrCodeConfig } from './type';

const DEFAULT_VALUE = {
  value: 'https://www.baidu.com/',
};

const DEFAULT_QR_CODE_LOGO =
  'data:image/jpeg;base64,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';

export default () => {
  const CUSTOM_CONFIG: ComponentData.TInternalComponentConfig<TQrCodeConfig> = {
    interactive: {
      base: [],
      linkage: [
        {
          type: 'click',
          name: '点击',
          show: false,
          description: '',
          value: '',
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
            field: 'name',
            map: '',
            description: '内容',
            id: 'name',
            type: 'string',
          },
          {
            field: 'value',
            map: '',
            description: '状态',
            id: 'value',
            type: 'string',
          },
        ],
      },
    },
    options: {
      condition: DEFAULT_CONDITION_CONFIG(),
      base: {
        backgroundColor: {
          r: 255,
          g: 255,
          b: 255,
        },
        codeColor: ThemeUtil.generateNextColor4CurrentTheme(0),
        margin: 4,
      },
      logo: {
        show: true,
        image: DEFAULT_QR_CODE_LOGO,
        size: {
          width: 50,
          height: 50,
        },
        borderRadius: 8,
        border: {
          width: 1,
          color: {
            r: 255,
            g: 255,
            b: 255,
          },
          type: 'solid',
        },
      },
    },
  };

  const DefaultConfig: ComponentData.TComponentData<TQrCodeConfig> =
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
