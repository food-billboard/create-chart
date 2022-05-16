export type TRadialBarConfig = {
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
    backgroundStyle: ComponentData.TGradientColorConfig;
    label: ComponentData.ComponentSeriesLabelConfig & {
      rotate: number;
    };
    itemStyle: {
      color: ComponentData.TGradientColorConfig[];
    };
    barGap: number;
    barWidth: 'auto' | number;
  };
  animation: ComponentData.ComponentChartAnimationConfig;
  condition: ComponentData.ComponentCondition[];
};
