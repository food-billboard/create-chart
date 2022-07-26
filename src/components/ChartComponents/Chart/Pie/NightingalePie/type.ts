export type TNightingaleConfig = {
  legend: Omit<ComponentData.ComponentLegend, 'type'>;
  tooltip: ComponentData.ComponentTooltip & {
    animation: ComponentData.ComponentTooltipAnimation;
  };
  series: {
    label: Omit<ComponentData.ComponentSeriesLabelConfig, 'position'> & {
      formatter: string;
    };
    labelLine: {
      show: boolean;
      length: number;
      length2: number;
      smooth: boolean;
    };
    itemStyle: {
      color: ComponentData.TColorConfig[];
    };
    center: [number, number];
    radius: [number, number];
  };
  animation: ComponentData.ComponentChartAnimationConfig;
  condition: ComponentData.ComponentConditionConfig;
};
