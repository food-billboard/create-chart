import { useEffect, useMemo, useRef, useState } from 'react';

export default ({
  config,
  screenType,
  value,
  seriesKey,
  fieldMap,
}: {
  config: ComponentData.BarCarouselConfig;
  screenType: ComponentData.TGlobalData['screenType'];
  value: any;
  seriesKey: string;
  fieldMap: ComponentData.TComponentMapData[];
}) => {
  const { show, speed, showCount } = config;

  const [index, setIndex] = useState(0);

  const timerRef = useRef<NodeJS.Timeout>();

  const originDataSeriesKey = useMemo(() => {
    const targetFieldMap = fieldMap.find((field) => field.field === seriesKey);
    return targetFieldMap?.map || targetFieldMap?.field || '';
  }, [seriesKey, fieldMap]);

  // { [seriesKey]: [ value0, value1 ] }
  const seriesKeysWidthValue = useMemo(() => {
    return value.reduce((acc: { [key: string]: any[] }, cur: any) => {
      const key = cur[originDataSeriesKey];
      if (!acc[key]) acc[key] = [];
      acc[key].push(cur);
      return acc;
    }, {});
  }, [value, originDataSeriesKey]);

  const seriesKeyLength = useMemo(() => {
    return Object.keys(seriesKeysWidthValue).length;
  }, [seriesKeysWidthValue]);

  const targetValue = useMemo(() => {
    if (!show) return value;
    return Object.values(seriesKeysWidthValue).reduce((acc: any[], cur) => {
      acc.push(
        ...(cur as any).slice(index * showCount, (index + 1) * showCount),
      );
      return acc;
    }, []);
  }, [index, seriesKeysWidthValue, value, show, showCount]);

  // interval
  useEffect(() => {
    if (!show || screenType === 'edit') return;
    timerRef.current = setInterval(() => {
      const valueLength = value.length || 0;
      const max = Math.ceil(valueLength / seriesKeyLength / showCount);
      setIndex((prev) => {
        let newIndex = prev + 1;
        newIndex %= max;
        return newIndex;
      });
    }, speed);
    return () => {
      clearInterval(timerRef.current);
    };
  }, [value, show, speed, showCount, seriesKeyLength]);

  return targetValue;
};
