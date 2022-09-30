import { CSSProperties, useCallback, useState } from 'react';

export const useCondition = (
  callback: (
    condition: ComponentData.ComponentCondition,
  ) => ComponentData.ComponentConditionActionType | false,
  screenType: ComponentData.ComponentProps['global']['screenType'],
) => {
  const [className, setClassName] = useState<string>('');
  const [style, setStyle] = useState<CSSProperties>({});

  const onCondition = useCallback(
    (
      condition: ComponentData.ComponentCondition,
      initialState: ComponentData.ComponentConditionConfig['initialState'],
    ) => {
      const result = callback(condition);

      if (screenType === 'edit') return false;

      switch (result) {
        case 'ease-in':
          setClassName('animate__fadeIn animate__animated');
          setStyle({});
          break;
        case 'ease-in-out':
          setClassName('component-condition-ease-in-out');
          setStyle({});
          break;
        case 'ease-out':
          setClassName('animate__fadeOut animate__animated');
          setStyle({});
          break;
        case 'hidden':
          setClassName('component-condition-hidden');
          setStyle({});
          break;
        case 'visible':
          setClassName('');
          setStyle({});
          break;
        default:
          setClassName(
            initialState === 'visible' ? '' : 'component-condition-hidden',
          );
          setStyle({});
      }

      return result;
    },
    [callback, screenType],
  );

  return {
    onCondition,
    style,
    className,
  };
};
