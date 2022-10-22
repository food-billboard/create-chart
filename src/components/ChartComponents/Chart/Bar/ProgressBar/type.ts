export type TProgressBarConfig = {
  grid: ComponentData.ComponentGrid;
  yAxis: {
    axisLabel: {
      show: boolean;
      textStyle: ComponentData.TFontConfig;
      value: string;
    };
  };
  tooltip: ComponentData.ComponentTooltip;
  series: {
    showBackground: boolean;
    backgroundStyle: {
      color: ComponentData.TColorConfig;
    };
    label: Omit<ComponentData.ComponentSeriesLabelConfig, 'position'> & {
      formatter: string;
    };
    itemStyle: {
      color: ComponentData.TGradientColorConfig;
    };
    barWidth: number;
  };
  animation: ComponentData.ComponentChartAnimationConfig;
  condition: ComponentData.ComponentConditionConfig;
};
