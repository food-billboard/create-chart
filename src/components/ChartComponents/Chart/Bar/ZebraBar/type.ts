export type TZebraBarConfig = {
  grid: ComponentData.ComponentGrid;
  legend: Omit<ComponentData.ComponentLegend, 'type'>;
  xAxis: ComponentData.ComponentXAxis;
  yAxis: ComponentData.ComponentYAxis;
  tooltip: ComponentData.ComponentTooltip & {
    animation: ComponentData.ComponentTooltipAnimation;
  };
  series: {
    space: {
      margin: number;
    };
    label: ComponentData.ComponentSeriesLabelConfig;
    itemStyle: {
      color: ComponentData.TColorConfig[];
    };
    barWidth: [number, number];
  };
  animation: ComponentData.ComponentChartAnimationConfig;
  condition: ComponentData.ComponentCondition[];
};
