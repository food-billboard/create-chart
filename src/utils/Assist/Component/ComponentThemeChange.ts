import { getComponentThemeConfigByType } from '@/components/ChartComponents';
import ThemeUtil from '../Theme';
import { getDvaGlobalModelData } from './index';

function covertComponentsThemeColor(
  themeName: string,
): ComponentMethod.SetComponentMethodParamsData[] {
  const state = getDvaGlobalModelData();
  const components: ComponentData.TComponentData[] = state.components;
  const colorList = ThemeUtil.getThemeColorList(themeName);
  const changeComponents = components
    .map((component) => {
      const { id, componentType, config } = component;
      const { convert } = (getComponentThemeConfigByType(componentType) ||
        {}) as any;
      const options = convert(colorList, config.options);
      if (!Object.keys(options || {}).length) return false;
      return {
        value: !!convert
          ? {
              config: {
                options,
              },
            }
          : {},
        id,
        action: 'update',
      };
    })
    .filter(Boolean);

  return changeComponents as ComponentMethod.SetComponentMethodParamsData[];
}

export default covertComponentsThemeColor;
