import { mergeWithoutArray } from '@/utils';
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

const DEFAULT_VALUE: any = [];

export default () => {
  const DEFAULT_THEME_COLOR_LIST_DATA = DEFAULT_THEME_COLOR_LIST();
  const CUSTOM_CONFIG: ComponentData.TInternalComponentConfig<TAli3DMapConfig> =
    {
      interactive: {
        base: [],
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
        tooltip: {
          ...DEFAULT_TOOLTIP_CONFIG(),
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
