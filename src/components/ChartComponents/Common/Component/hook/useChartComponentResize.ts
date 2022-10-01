import { useEffect } from 'react';
import echarts from 'echarts';
import { useDebounceFn, useSize, useUpdateEffect } from 'ahooks';
import EventEmitter from '../EventEmitter';

export function useChartComponentResize(instance: echarts.ECharts) {
  const size = useSize(instance?.getDom());

  const { run } = useDebounceFn(() => {
    instance && instance.resize();
  });

  useUpdateEffect(() => {
    run();
  }, [size]);

  useEffect(() => {
    instance && EventEmitter.push(instance);
    return () => {
      return EventEmitter.pop(instance);
    };
  }, [instance]);
}
