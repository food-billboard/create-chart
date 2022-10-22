export type TWaterBallConfig = {
  series: {
    label: Omit<ComponentData.ComponentSeriesLabelConfig, 'position'>;
    amplitude: number;
    backgroundStyle: {
      color: ComponentData.TColorConfig;
    };
    color: ComponentData.TGradientColorConfig;
    center: [number, number];
    radius: number;
  };
  condition: ComponentData.ComponentConditionConfig;
  animation: ComponentData.ComponentChartAnimationConfig;
};
