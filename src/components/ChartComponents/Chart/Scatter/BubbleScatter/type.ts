export type TBubbleScatterConfig = {
  tooltip: ComponentData.ComponentTooltip & {
    animation: ComponentData.ComponentTooltipAnimation;
  };
  title: {
    show: boolean;
    textStyle: ComponentData.TFontConfig;
    defaultValue: string;
  };
  xAxis: {
    left: number;
    axisLabel: ComponentData.TFontConfig & {
      show: boolean;
      rotate: number;
      margin: number;
      formatter: string;
    };
    axisTick: {
      show: boolean;
      lineStyle: ComponentData.ComponentLineGroupConfig;
    };
    axisLine: {
      show: boolean;
      symbol: ComponentData.ComponentSymbol;
      symbolSize: [number, number];
      lineStyle: ComponentData.ComponentLineGroupConfig;
    };
    name: string;
    nameTextStyle: ComponentData.TFontConfig;
    nameGap: number;
  };
  series: {
    symbolSize: number;
    itemStyle: {
      color: ComponentData.TColorConfig[];
    };
  };
  animation: ComponentData.ComponentChartAnimationConfig;
  condition: ComponentData.ComponentCondition[];
};
