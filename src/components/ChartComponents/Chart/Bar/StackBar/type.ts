export type TStackBarConfig = {
  grid: ComponentData.ComponentGrid;
  legend: ComponentData.ComponentLegend;
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
      color: ComponentData.TColorConfig;
      barWidth: 'auto' | number;
    }[];
  };
  animation: ComponentData.ComponentChartAnimationConfig;
  condition: ComponentData.ComponentConditionConfig;
};
