export type TNegativeBarConfig = {
  grid: ComponentData.ComponentGrid;
  legend: Omit<ComponentData.ComponentLegend, 'type'>;
  xAxis: ComponentData.ComponentXAxis & {
    splitLine: {
      show: boolean;
      lineStyle: ComponentData.ComponentLineGroupConfig;
    };
  };
  yAxis: ComponentData.ComponentYAxis;
  tooltip: ComponentData.ComponentTooltip & {
    animation: ComponentData.ComponentTooltipAnimation;
  };
  series: {
    itemStyle: {
      color: ComponentData.TColorConfig[];
    };
    label: (ComponentData.ComponentSeriesLabelConfig & {
      formatter: string;
    })[];
    barWidth: 'auto' | number;
  };
  animation: ComponentData.ComponentChartAnimationConfig;
  condition: ComponentData.ComponentCondition[];
};
