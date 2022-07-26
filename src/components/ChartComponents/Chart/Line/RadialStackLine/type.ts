export type TRadialStackLineConfig = {
  grid: ComponentData.ComponentGrid;
  legend: Omit<ComponentData.ComponentLegend, 'type'>;
  xAxis: ComponentData.ComponentXAxis;
  yAxis: ComponentData.ComponentYAxis;
  tooltip: ComponentData.ComponentTooltip;
  series: {
    areaStyle: {
      color: ComponentData.TGradientColorConfig[];
    };
  };
  animation: ComponentData.ComponentChartAnimationConfig;
  condition: ComponentData.ComponentConditionConfig;
};
