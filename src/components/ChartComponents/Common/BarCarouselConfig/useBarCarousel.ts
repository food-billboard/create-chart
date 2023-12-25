import { useEffect, useRef, useState } from 'react';

export default (
  config: ComponentData.BarCarouselConfig,
  screenType: ComponentData.TGlobalData['screenType'],
  value: any,
) => {
  const { show, speed, showCount } = config;

  const [stateValue, setStateValue] = useState<any[]>(
    show ? value.slice(0, showCount) : value,
  );

  const timerRef = useRef<NodeJS.Timeout>();
  const indexRef = useRef<number>(showCount - 1);

  useEffect(() => {
    if (!show) return;
    if (screenType === 'edit') {
      setStateValue(value.slice(0, showCount));
      return;
    }
    timerRef.current = setInterval(() => {
      const valueLength = value.length || 0;
      indexRef.current++;
      if (indexRef.current >= valueLength) {
        indexRef.current = 0;
      }
      setStateValue((prev) => {
        return [...prev.slice(1), value[indexRef.current]];
      });
    }, speed);
    return () => {
      clearInterval(timerRef.current);
    };
  }, [value, show, speed, showCount, value]);

  return stateValue;
};
