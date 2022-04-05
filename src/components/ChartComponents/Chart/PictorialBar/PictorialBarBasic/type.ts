type CommonAxisConfig = Omit<ComponentData.ComponentXAxis, 'position'>;

export type TPictorialBarBasicConfig = {
  xAxis: CommonAxisConfig & {
    max: number;
  };
  yAxis: CommonAxisConfig;
  tooltip: ComponentData.ComponentTooltip;
  series: {
    spirit: {
      show: boolean;
      value: string;
    };
    symbol: ComponentData.ComponentSymbol | string;
    symbolSize: [number, number];
    symbolRotate: number;
    symbolRepeat: boolean | 'fixed';
    symbolMargin: number;
    symbolRepeatDirection: 'start' | 'end';
    symbolColor: ComponentData.TColorConfig;
  };
  animation: ComponentData.ComponentChartAnimationConfig;
  condition: ComponentData.ComponentCondition[];
};
