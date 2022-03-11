import { useMemo } from 'react';
import FilterDataUtil from '@/utils/Assist/FilterData';

const format = (
  processedValue: any,
  fields: any,
  counter: any = {
    seriesKeys: [],
    xAxisKeys: [],
    yAxisValues: {
      _defaultValue_: [],
    },
  },
) => {
  if (Array.isArray(processedValue)) {
    return processedValue.reduce(
      (acc: any, cur: any) => {
        format(cur, fields, acc);
        return acc;
      },
      {
        seriesKeys: [],
        xAxisKeys: [],
        yAxisValues: {
          _defaultValue_: [],
        },
      },
    );
  } else {
    const seriesKey = processedValue[fields.seriesKey];
    const yAxisValue = processedValue[fields.yAxisValue];
    const xAxisValue = processedValue[fields.xAxisKeyKey];
    if (seriesKey && !counter.seriesKeys.includes(seriesKey)) {
      counter.seriesKeys.push(seriesKey);
    }
    if (seriesKey) {
      if (!counter.yAxisValues[seriesKey]) counter.yAxisValues[seriesKey] = [];
      counter.yAxisValues[seriesKey].push(yAxisValue);
    } else {
      counter.yAxisValues._defaultValue_.push(yAxisValue);
    }
    if (!counter.xAxisKeys.includes(xAxisValue))
      counter.xAxisKeys.push(processedValue[fields.xAxisKeyKey]);

    return counter;
  }
};

export function useChartValueMapField(
  value: any[],
  {
    map,
    fields,
  }: {
    map: ComponentData.TComponentMapData[];
    fields: {
      seriesKey: string;
      xAxisKeyKey: string;
      yAxisValue: string;
    };
  },
) {
  const processedValue = useMemo(() => {
    return FilterDataUtil.getFieldMapValue(value, { map });
  }, [value, map]);

  const fieldsMap = useMemo(() => {
    return format(processedValue, fields);
  }, [processedValue, fields]);

  return {
    ...fieldsMap,
    value: processedValue,
  };
}
