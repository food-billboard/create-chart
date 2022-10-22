export type TRankBarConfig = {
  grid: ComponentData.ComponentGrid;
  yAxis: {
    textStyle: ComponentData.TFontConfig;
    rankIcon: {
      show: boolean;
      textStyle: ComponentData.TFontConfig;
      showBackground: boolean;
    };
  };
  tooltip: ComponentData.ComponentTooltip & {
    animation: ComponentData.ComponentTooltipAnimation;
  };
  series: {
    backgroundStyle: {
      show: boolean;
      color: ComponentData.TColorConfig;
    };
    itemStyle: {
      color: ComponentData.TGradientColorConfig[];
      defaultColor: ComponentData.TGradientColorConfig;
    };
    label: Omit<ComponentData.ComponentSeriesLabelConfig, 'position'> & {
      formatter: string;
      position: 'top' | 'deep-top' | 'center';
    };
    barWidth: number;
  };
  animation: ComponentData.ComponentChartAnimationConfig;
  condition: ComponentData.ComponentConditionConfig;
};
