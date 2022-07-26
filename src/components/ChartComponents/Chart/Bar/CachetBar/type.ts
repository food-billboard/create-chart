export type TCachetBarConfig = {
  grid: ComponentData.ComponentGrid;
  legend: Omit<ComponentData.ComponentLegend, 'type'>;
  xAxis: Omit<ComponentData.ComponentXAxis, 'position'>;
  yAxis: Omit<ComponentData.ComponentYAxis, 'position'>;
  tooltip: ComponentData.ComponentTooltip & {
    animation: ComponentData.ComponentTooltipAnimation;
  };
  series: {
    backgroundStyle: {
      borderColor: ComponentData.TColorConfig;
      backgroundColor: ComponentData.TColorConfig;
      borderRadius: number;
      borderWidth: number;
    };
    label: Omit<ComponentData.ComponentSeriesLabelConfig, 'position'>;
    itemStyle: {
      color: ComponentData.TGradientColorConfig[];
    };
    barWidth: number;
    borderRadius: number;
  };
  animation: ComponentData.ComponentChartAnimationConfig;
  condition: ComponentData.ComponentConditionConfig;
};
