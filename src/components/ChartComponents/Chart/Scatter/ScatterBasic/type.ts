export type TScatterBasicConfig = {
  grid: ComponentData.ComponentGrid;
  legend: Omit<ComponentData.ComponentLegend, 'type'>;
  tooltip: ComponentData.ComponentTooltip & {
    animation: ComponentData.ComponentTooltipAnimation;
  };
  xAxis: ComponentData.ComponentXAxis;
  yAxis: ComponentData.ComponentYAxis;
  series: {
    symbol: ComponentData.ComponentSymbol;
    symbolSize: number;
    itemStyle: {
      color: ComponentData.TColorConfig;
      borderColor: ComponentData.TColorConfig;
      borderType: ComponentData.ComponentLineStyle;
      borderWidth: number;
      shadow: Omit<ComponentData.TBoxShadow, 'spread'>;
    }[];
  };
  animation: ComponentData.ComponentChartAnimationConfig;
  condition: ComponentData.ComponentConditionConfig;
};
