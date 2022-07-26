export type TPolarStackBarConfig = {
  polar: {
    radius: [number, number];
  };
  angleAxis: {
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
  };
  animation: ComponentData.ComponentChartAnimationConfig;
  condition: ComponentData.ComponentConditionConfig;
};
