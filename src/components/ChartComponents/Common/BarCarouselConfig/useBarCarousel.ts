import { useEffect, useRef, useState } from 'react';

export default (
  config: ComponentData.BarCarouselConfig,
  screenType: ComponentData.TGlobalData['screenType'],
  value: any,
) => {
  const { show, speed, showCount } = config;

  const [stateValue, setStateValue] = useState<any[]>(
    value.slice(0, showCount),
  );

  const timerRef = useRef<NodeJS.Timeout>();
  const indexRef = useRef<number>(showCount - 1);

  useEffect(() => {
    if (screenType === 'edit' || !show) return;
    timerRef.current = setInterval(() => {
      const valueLength = value.length || 0;
      indexRef.current++;
      if (indexRef.current >= valueLength) {
        indexRef.current = 0;
      }
      setStateValue((prev) => {
        prev.shift();
        prev.push(value[indexRef.current]);
        return prev;
      });
    }, speed);
    return () => {
      clearInterval(timerRef.current);
    };
  }, [value, show, speed, showCount, value]);

  return stateValue;
};
