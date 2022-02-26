export type TBarBasicConfig = {
  legend: Omit<ComponentData.ComponentLegend, 'type'>;
  xAxis: ComponentData.ComponentXAxis;
  yAxis: ComponentData.ComponentYAxis;
  tooltip: ComponentData.ComponentTooltip;
  series: {
    showBackground: boolean;
    backgroundStyle: {
      color: ComponentData.TColorConfig;
    };
    label: {
      show: boolean;
      position: ComponentData.ComponentLabelPosition;
      rotate: number;
    } & ComponentData.TFontConfig;
    itemStyle: {
      color: ComponentData.TColorConfig;
      decal: {
        symbol: ComponentData.ComponentSymbol;
        symbolSize: number;
      };
    };
    barGap: number;
    barWidth: 'auto' | number;
  };
};
