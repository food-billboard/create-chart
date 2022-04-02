export type TBarBasicConfig = {
  legend: Omit<ComponentData.ComponentLegend, 'type'>;
  xAxis: ComponentData.ComponentXAxis;
  yAxis: ComponentData.ComponentYAxis & {
    splitLine: {
      show: boolean;
      lineStyle: ComponentData.ComponentLineGroupConfig;
    };
  };
  tooltip: ComponentData.ComponentTooltip;
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
  condition: ComponentData.ComponentCondition[];
};
