import { getComponentThemeConfigByType } from '@/components/ChartComponents';
import { getDvaGlobalModelData } from './index';
import ThemeUtil from '../Theme';

function covertComponentsThemecOLOR(
  themeName: string,
): ComponentMethod.SetComponentMethodParamsData[] {
  const state = getDvaGlobalModelData();
  const components: ComponentData.TComponentData[] = state.components;
  const colorList = ThemeUtil.getThemeColorList(themeName);
  return components.map((component) => {
    const { id, componentType } = component;
    const { convert } = (getComponentThemeConfigByType(componentType) ||
      {}) as any;
    return {
      value: !!convert
        ? {
            config: {
              options: convert(colorList),
            },
          }
        : {},
      id,
      action: 'update',
    };
  });
}

export default covertComponentsThemecOLOR;
