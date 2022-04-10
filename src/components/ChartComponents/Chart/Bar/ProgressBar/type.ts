export type TProgressBarConfig = {
  yAxis: {
    axisLabel: {
      show: boolean;
      textStyle: ComponentData.TFontConfig;
      value: string;
    };
  };
  tooltip: ComponentData.ComponentTooltip;
  series: {
    showBackground: boolean;
    backgroundStyle: {
      color: ComponentData.TColorConfig;
      borderRadius: number;
    };
    label: Omit<ComponentData.ComponentSeriesLabelConfig, 'position'> & {
      formatter: string;
    };
    itemStyle: {
      color: ComponentData.TGradientColorConfig;
      borderRadius: number;
    };
    barWidth: 'auto' | number;
  };
  animation: ComponentData.ComponentChartAnimationConfig;
  condition: ComponentData.ComponentCondition[];
};
