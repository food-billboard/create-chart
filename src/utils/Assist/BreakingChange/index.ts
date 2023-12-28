import { get } from 'lodash';
import { mergeWithoutArray } from '../../tool';
import { ComponentInputButtonWidthChange } from './ComponentInputButtonWidthChange';
import { ConditionChange } from './ConditionChange';
import { ScreenComponentConfigChangeTooltip } from './ScreenComponentConfigChangeTooltip';
import { ScreenThemeSaveLogicChange } from './ScreenThemeSaveLogicChange';
import { ScreenThemeTypeChange } from './ScreenThemeTypeChange';

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
  let newTheme = ScreenThemeTypeChange(
    get(config, 'attr.theme'),
  ) as ComponentData.TScreenTheme;

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

  // * breaking change 1.22
  newTheme = ScreenThemeSaveLogicChange(newTheme, version);

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
