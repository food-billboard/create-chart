export type TBarBasicConfig = {
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
    showBackground: boolean;
    backgroundStyle: {
      color: ComponentData.TColorConfig;
    };
    label: ComponentData.ComponentSeriesLabelConfig & {
      rotate: number;
    };
    itemStyle: {
      color: ComponentData.TColorConfig[];
    };
    barGap: number;
    barWidth: 'auto' | number;
  };
  animation: ComponentData.ComponentChartAnimationConfig;
  condition: ComponentData.ComponentConditionConfig;
};
