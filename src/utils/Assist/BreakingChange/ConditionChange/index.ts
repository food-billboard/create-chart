import { mergeWithoutArray } from '@/utils';

export const ConditionChange = (
  components: ComponentData.TComponentData[],
  version: string,
) => {
  if (parseFloat(version) >= 1.8) return components;
  return components.map((component) => {
    const {
      config: { options },
    } = component;
    const { condition } = options as any;
    return mergeWithoutArray(component, {
      config: {
        options: {
          condition: {
            value: condition || [],
            initialState: 'visible',
          },
        },
      },
    });
  });
};
