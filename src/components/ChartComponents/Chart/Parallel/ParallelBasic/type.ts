export type TParallelBasicConfig = {
  legend: Omit<ComponentData.ComponentLegend, 'type'>;
  parallelAxis: {
    areaSelectStyle: {
      width: number;
      color: ComponentData.TColorConfig;
    };
    nameLocation: 'start' | 'center' | 'end';
    nameTextStyle: ComponentData.TFontConfig;
    nameGap: number;
    nameRotate: number;
    axisLine: {
      show: boolean;
      lineStyle: ComponentData.ComponentLineGroupConfig;
    };
    axisLabel: {
      show: boolean;
      rotate: number;
      margin: number;
    } & ComponentData.TFontConfig;
  };
  parallel: ComponentData.PositionType & {
    layout: 'vertical' | 'horizontal';
  };
  series: {
    smooth: boolean;
    lineStyle: ComponentData.ComponentLineGroupConfig[];
  };
  animation: ComponentData.ComponentChartAnimationConfig;
  condition: ComponentData.ComponentCondition[];
};
