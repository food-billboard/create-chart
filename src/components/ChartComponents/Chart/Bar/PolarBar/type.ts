export type TPolarBarConfig = {
  polar: {
    radius: [number, number];
  };
  angleAxis: {
    min: number;
    max: number;
    startAngle: number;
    axisLabel: {
      show: boolean;
      margin: number;
    } & ComponentData.TFontConfig;
  };
  tooltip: ComponentData.ComponentTooltip;
  legend: Omit<ComponentData.ComponentLegend, 'type'>;
  series: {
    label: Omit<ComponentData.ComponentSeriesLabelConfig, 'position'> & {
      position: 'inside' | 'outside';
    };
    itemStyle: {
      color: ComponentData.TColorConfig[];
    };
    barWidth: number;
  };
  animation: ComponentData.ComponentChartAnimationConfig;
  condition: ComponentData.ComponentCondition[];
};
