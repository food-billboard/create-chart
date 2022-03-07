export type TLineBasicConfig = {
  legend: Omit<ComponentData.ComponentLegend, 'type'>;
  xAxis: ComponentData.ComponentXAxis;
  yAxis: ComponentData.ComponentYAxis;
  tooltip: ComponentData.ComponentTooltip;
  series: {
    smooth: boolean;
    label: ComponentData.ComponentSeriesLabelConfig & {
      rotate: number;
    };
    itemStyle: {
      color: ComponentData.TColorConfig[];
      decal: {
        symbol: ComponentData.ComponentSymbol;
        symbolSize: number;
      }[];
    };
    areaStyle: {
      color: ComponentData.TColorConfig[];
    };
    lineStyle: {
      color: ComponentData.TColorConfig;
      width: number;
      type: ComponentData.ComponentLineStyle;
    }[];
  };
  animation: ComponentData.ComponentChartAnimationConfig;
};
