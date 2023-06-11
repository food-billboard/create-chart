import { get } from 'lodash';
import { ConditionChange } from './ConditionChange';
import { ScreenThemeTypeChange } from './ScreenThemeTypeChange';
import { ComponentInputButtonWidthChange } from './ComponentInputButtonWidthChange';
import { ScreenComponentConfigChangeTooltip } from './ScreenComponentConfigChangeTooltip';
import { mergeWithoutArray } from '../../tool';

export * from './ComponentTransformOriginChange';

const BreakingChange: (
  screenData: ComponentData.TScreenData,
  version: string,
) => ComponentData.TScreenData = (screenData, version) => {
  const { components, config, ...nextScreenData } = screenData;

  // * breaking change 1.8
  let newVersionComponentList: ComponentData.TComponentData[] = ConditionChange(
    components,
    version,
  );

  // * breaking change 1.14
  const newTheme = ScreenThemeTypeChange(get(config, 'attr.theme'));

  // * breaking change 1.17
  newVersionComponentList = ComponentInputButtonWidthChange(
    components,
    version,
  );

  // * breaking change 1.21
  const configTooltipConfig1P21 = ScreenComponentConfigChangeTooltip(
    screenData,
    version,
  );

  return {
    ...nextScreenData,
    ...configTooltipConfig1P21,
    config: mergeWithoutArray({}, config, {
      attr: {
        theme: newTheme,
      },
    }),
    components: newVersionComponentList,
  };
};

export default BreakingChange;
