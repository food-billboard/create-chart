import { mergeWithoutArray } from '@/utils';
import {
  BASIC_DEFAULT_CONFIG,
  BASIC_DEFAULT_DATA_CONFIG,
  BASIC_DEFAULT_INTERACTIVE_CONFIG,
  DEFAULT_FONT_CONFIG,
  DEFAULT_CONDITION_CONFIG,
} from '../../Common/Constants/defaultConfig';
import { THtmlFragmentConfig } from './type';

const DEFAULT_VALUE = '<h3>我是一段代码片段</h3>';

export default () => {
  const CUSTOM_CONFIG: ComponentData.TInternalComponentConfig<THtmlFragmentConfig> =
    {
      interactive: {
        base: [],
        linkage: [],
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
        condition: DEFAULT_CONDITION_CONFIG(),
        textStyle: {
          ...DEFAULT_FONT_CONFIG,
          fontSize: 24,
        },
        fragment: DEFAULT_VALUE,
      },
    };

  const DefaultConfig: ComponentData.TComponentData<THtmlFragmentConfig> =
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
          height: 180,
        },
      },
      CUSTOM_CONFIG,
    );

  return DefaultConfig;
};

export const themeConfig = {
  convert: (colorList: string[]) => {},
};
