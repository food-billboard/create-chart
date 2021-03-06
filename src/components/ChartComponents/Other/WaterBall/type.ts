export type TWaterBallConfig = {
  series: {
    label: Omit<ComponentData.ComponentSeriesLabelConfig, 'position'>;
    amplitude: number;
    waveAnimation: boolean;
    backgroundStyle: {
      color: ComponentData.TColorConfig;
    };
    color: ComponentData.TGradientColorConfig;
    center: [number, number];
    radius: number;
  };
  condition: ComponentData.ComponentCondition[];
  animation: ComponentData.ComponentChartAnimationConfig;
};
