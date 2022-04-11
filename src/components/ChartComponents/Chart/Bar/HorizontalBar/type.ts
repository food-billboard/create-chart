export type THorizontalBarConfig = {
  legend: Omit<ComponentData.ComponentLegend, 'type'>;
  xAxis: ComponentData.ComponentXAxis;
  yAxis: ComponentData.ComponentYAxis;
  tooltip: ComponentData.ComponentTooltip & {
    animation: ComponentData.ComponentTooltipAnimation;
  };
  series: {
    itemStyle: {
      color: ComponentData.TColorConfig[];
    };
    label: Omit<ComponentData.ComponentSeriesLabelConfig, 'position'> & {
      formatter: string;
    };
    barWidth: 'auto' | number;
  };
  animation: ComponentData.ComponentChartAnimationConfig;
  condition: ComponentData.ComponentCondition[];
};
