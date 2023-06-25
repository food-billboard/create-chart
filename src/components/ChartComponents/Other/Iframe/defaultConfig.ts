import { mergeWithoutArray } from '@/utils';
import {
  BASIC_DEFAULT_CONFIG,
  BASIC_DEFAULT_DATA_CONFIG,
  BASIC_DEFAULT_INTERACTIVE_CONFIG,
  DEFAULT_INTERACTIVE_BASE_CONFIG,
} from '../../Common/Constants/defaultConfig';
import { TIFrameConfig } from './type';
import { OnMessageTooltipName } from './component/MessageTooltip';

const DEFAULT_VALUE = {
  value: 'http://47.97.27.23/api/backend/screen/index.html#/',
};

export default () => {
  const CUSTOM_CONFIG: ComponentData.TInternalComponentConfig<TIFrameConfig> = {
    interactive: {
      base: [
        {
          ...DEFAULT_INTERACTIVE_BASE_CONFIG,
          type: 'message',
          name: 'iframe通信',
          extend: true,
          description: `component_${OnMessageTooltipName}`,
          fields: [
            {
              key: 'value',
              variable: '',
              description: '示例通信值',
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
            field: 'value',
            map: '',
            description: '地址',
            id: 'value',
            type: 'string',
          },
        ],
      },
    },
    options: {
      scrolling: 'auto',
      scale: 1,
      pointEvent: false,
      relationParams: [],
    },
  };

  const DefaultConfig: ComponentData.TComponentData<TIFrameConfig> =
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
    return {};
  },
};
