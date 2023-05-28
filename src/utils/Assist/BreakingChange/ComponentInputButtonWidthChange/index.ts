import { versionCompare, mergeWithoutArray } from '@/utils';
import InputComponent from '@/components/ChartComponents/Interactive/Input';

export const ComponentInputButtonWidthChange = (
  components: ComponentData.TComponentData[],
  version: string,
) => {
  if (versionCompare(version, '1.17')) return components;
  const loop: (
    components: ComponentData.TComponentData[],
  ) => ComponentData.TComponentData[] = (components) => {
    return components.map((component) => {
      const {
        config: {
          options,
          style: { width },
        },
        componentType,
        type,
      } = component;
      if (type === 'GROUP_COMPONENT')
        return {
          ...component,
          components: loop(component.components),
        };
      if (componentType !== InputComponent.type) return component;
      return mergeWithoutArray(component, {
        config: {
          options: {
            search: {
              width: 100 * ((options as any).search.width / width),
            },
          },
        },
      });
    });
  };
  return loop(components);
};
