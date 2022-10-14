import { useEffect, useRef } from 'react';
import echarts from 'echarts';
import { useDebounceFn, useSize, useUpdateEffect } from 'ahooks';
import EventEmitter from '../EventEmitter';

export function useChartComponentResize(instance: echarts.ECharts) {
  const size = useSize(instance?.getDom());
  const domSizeChanged = useRef(false);

  const { run } = useDebounceFn(() => {
    instance && instance.resize();
  });

  useUpdateEffect(() => {
    if (!domSizeChanged.current) {
      domSizeChanged.current = true;
      return;
    }
    run();
  }, [size]);

  useEffect(() => {
    instance && EventEmitter.push(instance);
    return () => {
      return EventEmitter.pop(instance);
    };
  }, [instance]);
}
