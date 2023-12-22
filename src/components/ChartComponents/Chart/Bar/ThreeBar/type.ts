export type TThreeBarConfig = {
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
    carousel: ComponentData.BarCarouselConfig;
    label: Omit<ComponentData.ComponentSeriesLabelConfig, 'position'> & {
      rotate: number;
    };
    itemStyle: {
      color: ComponentData.TColorConfig[];
    };
    barGap: number;
    barWidth: number;
  };
  animation: ComponentData.ComponentChartAnimationConfig;
  condition: ComponentData.ComponentConditionConfig;
};
