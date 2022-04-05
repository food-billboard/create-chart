export type TSunBurstBasicConfig = {
  tooltip: ComponentData.ComponentTooltip;
  series: {
    center: [number, number];
    radius: number;
    label: Omit<ComponentData.ComponentSeriesLabelConfig, 'position'> & {
      formatter: string;
    };
    nodeClick: false | 'rootToNode';
  };
  animation: ComponentData.ComponentChartAnimationConfig;
  condition: ComponentData.ComponentCondition[];
};
