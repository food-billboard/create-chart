export type TWaterFallBarConfig = {
  grid: ComponentData.ComponentGrid;
  xAxis: ComponentData.ComponentXAxis;
  yAxis: ComponentData.ComponentYAxis & {
    splitLine: {
      show: boolean;
      lineStyle: ComponentData.ComponentLineGroupConfig;
    };
  };
  tooltip: ComponentData.ComponentTooltip & {
    animation: ComponentData.ComponentTooltipAnimation;
  };
  series: {
    label: ComponentData.ComponentSeriesLabelConfig;
    itemStyle: {
      color: ComponentData.TGradientColorConfig;
    };
    barWidth: number;
  };
  animation: ComponentData.ComponentChartAnimationConfig;
  condition: ComponentData.ComponentCondition[];
};
