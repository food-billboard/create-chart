import { get } from 'lodash';
import { ConditionChange } from './ConditionChange';
import { ScreenThemeTypeChange } from './ScreenThemeTypeChange';
import { mergeWithoutArray } from '../../tool';

const BreakingChange: (
  screenData: ComponentData.TScreenData,
  version: string,
) => ComponentData.TScreenData = (screenData, version) => {
  const { components, config, ...nextScreenData } = screenData;

  // * breaking change 1.8
  const newVersionComponentList = ConditionChange(components, version);

  // * breaking change 1.14
  const newTheme = ScreenThemeTypeChange(get(config, 'attr.theme'));

  return {
    ...nextScreenData,
    config: mergeWithoutArray({}, config, {
      attr: {
        theme: newTheme,
      },
    }),
    components: newVersionComponentList,
  };
};

export default BreakingChange;
