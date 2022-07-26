export type TCirclePieConfig = {
  legend: Omit<ComponentData.ComponentLegend, 'type'>;
  tooltip: ComponentData.ComponentTooltip & {
    animation: ComponentData.ComponentTooltipAnimation;
  };
  statistics: {
    show: boolean;
    align: 'vertical' | 'horizontal';
    textStyle: ComponentData.TFontConfig;
    addonBefore: {
      show: boolean;
      value: string;
      textStyle: ComponentData.TFontConfig;
    };
    addonAfter: {
      show: boolean;
      value: string;
      textStyle: ComponentData.TFontConfig;
    };
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
    radius: [number, number];
  };
  animation: ComponentData.ComponentChartAnimationConfig;
  condition: ComponentData.ComponentConditionConfig;
};
