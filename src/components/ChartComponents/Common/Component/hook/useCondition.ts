import { CSSProperties, useCallback, useState } from 'react';

export const useCondition = (
  callback: (
    condition: ComponentData.ComponentCondition,
  ) => ComponentData.ComponentConditionActionType | false,
) => {
  const [className, setClassName] = useState<string>('');
  const [style, setStyle] = useState<CSSProperties>({});

  const onCondition = useCallback(
    (condition: ComponentData.ComponentCondition) => {
      const result = callback(condition);

      switch (result) {
        case 'ease-in':
          setClassName('animate__fadeIn animate__animated');
          break;
        case 'ease-in-out':
          setClassName('component-condition-ease-in-out');
          break;
        case 'ease-out':
          setClassName('animate__fadeOut animate__animated');
          break;
        case 'hidden':
          setClassName('component-condition-hidden');
          break;
        case 'visible':
          break;
      }

      return result;
    },
    [callback],
  );

  return {
    onCondition,
    style,
    className,
  };
};
