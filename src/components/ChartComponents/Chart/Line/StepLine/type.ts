export type TStepLineConfig = {
  grid: ComponentData.ComponentGrid;
  legend: Omit<ComponentData.ComponentLegend, 'type'>;
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
    label: Omit<ComponentData.ComponentSeriesLabelConfig, 'position'> & {
      position: 'top' | 'bottom';
    };
    lineStyle: {
      color: ComponentData.TColorConfig;
    }[];
  };
  animation: ComponentData.ComponentChartAnimationConfig;
  condition: ComponentData.ComponentConditionConfig;
};
