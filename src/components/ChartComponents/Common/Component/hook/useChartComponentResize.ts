import { useEffect } from 'react';
import echarts from 'echarts';
import EventEmitter from '../EventEmitter';

export function useChartComponentResize(instance: echarts.ECharts) {
  useEffect(() => {
    instance && EventEmitter.push(instance);
    return () => {
      return EventEmitter.pop(instance);
    };
  }, [instance]);
}
