export type TBoxPlotBasicConfig = {
  grid: ComponentData.ComponentGrid;
  legend: Omit<ComponentData.ComponentLegend, 'type'>;
  xAxis: ComponentData.ComponentXAxis;
  yAxis: ComponentData.ComponentYAxis;
  tooltip: ComponentData.ComponentTooltip;
  series: {
    boxWidth: [number, number];
    itemStyle: {
      color: ComponentData.TColorConfig;
      borderColor: ComponentData.TColorConfig;
      borderWidth: number;
      borderType: ComponentData.ComponentLineStyle;
    }[];
  };
  animation: ComponentData.ComponentChartAnimationConfig;
  condition: ComponentData.ComponentConditionConfig;
};
