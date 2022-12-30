import { useRef } from 'react';
import { useUpdateEffect } from 'ahooks';
import type { ECharts } from 'echarts';

export function useAnimationChange(
  instance: ECharts,
  animationConfig: ComponentData.ComponentChartAnimationConfig,
  setOption: any,
) {
  const animationConfigRef =
    useRef<ComponentData.ComponentChartAnimationConfig>(animationConfig);

  useUpdateEffect(() => {
    const { animationEasing, animationDuration } = animationConfig;
    if (
      animationEasing !== animationConfigRef.current?.animationEasing ||
      animationDuration !== animationConfigRef.current?.animationDuration
    ) {
      animationConfigRef.current = animationConfig;
      instance?.clear();
      setOption();
    }
  }, [animationConfig, instance, setOption]);
}
