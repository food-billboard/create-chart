export type markPointTypeConfig = {
  show: boolean;
  symbol: ComponentData.ComponentSymbol;
  symbolSize: number;
  symbolRotate: number;
  label: {
    distance: number;
    formatter: string;
  } & ComponentData.ComponentSeriesLabelConfig;
  itemStyle: {
    color: ComponentData.TColorConfig;
  };
};

export type markLineTypeConfig = {
  show: boolean;
  label: Omit<ComponentData.ComponentSeriesLabelConfig, 'position'> & {
    formatter: string;
  };
  lineStyle: ComponentData.ComponentLineGroupConfig;
};

export type TCandlestickBasicConfig = {
  xAxis: ComponentData.ComponentXAxis;
  yAxis: ComponentData.ComponentYAxis;
  tooltip: ComponentData.ComponentTooltip;
  series: {
    barWidth: number;
    itemStyle: {
      color: ComponentData.TColorConfig;
      color0: ComponentData.TColorConfig;
      borderWidth: number;
      borderType: ComponentData.ComponentLineStyle;
      borderColor: ComponentData.TColorConfig;
      borderColor0: ComponentData.TColorConfig;
    };
    markPoint: {
      max: markPointTypeConfig;
      min: markPointTypeConfig;
      average: markPointTypeConfig;
    };
    markLine: {
      data: {
        max: markLineTypeConfig;
        min: markLineTypeConfig;
        average: markLineTypeConfig;
        median: markLineTypeConfig;
      };
    };
  };
  animation: ComponentData.ComponentChartAnimationConfig;
};
