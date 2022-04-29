import { mergeWithoutArray } from '@/utils';
import {
  BASIC_DEFAULT_CONFIG,
  BASIC_DEFAULT_DATA_CONFIG,
  BASIC_DEFAULT_INTERACTIVE_CONFIG,
} from '../../Common/Constants/defaultConfig';
import ThemeUtil from '@/utils/Assist/Theme';
import { TIconConfig } from './type';

export default () => {
  const CUSTOM_CONFIG: ComponentData.TInternalComponentConfig<TIconConfig> = {
    interactive: {
      base: [],
    },
    data: {
      request: {
        valueType: 'object',
      },
      filter: {
        map: [],
      },
      disabled: true,
    },
    options: {
      color: ThemeUtil.generateNextColor4CurrentTheme(0),
      value: 'bi-emoji-kiss',
    },
  };

  const DefaultConfig: ComponentData.TComponentData<TIconConfig> =
    mergeWithoutArray(
      {},
      {
        data: BASIC_DEFAULT_DATA_CONFIG,
        interactive: BASIC_DEFAULT_INTERACTIVE_CONFIG,
      },
      BASIC_DEFAULT_CONFIG,
      {
        style: {
          width: 100,
          height: 100,
        },
      },
      CUSTOM_CONFIG,
    );
  return DefaultConfig;
};
