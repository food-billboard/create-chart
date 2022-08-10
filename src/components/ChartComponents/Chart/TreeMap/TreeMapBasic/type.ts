export type TTreeMapBasicConfig = {
  tooltip: ComponentData.ComponentTooltip;
  series: {
    nodeClick: false | 'zoomToNode';
    squareRatio: number;
    label: Omit<ComponentData.ComponentSeriesLabelConfig, 'position'> & {
      formatter: string;
    };
    upperLabel: ComponentData.ComponentSeriesLabelConfig & {
      formatter: string;
    };
    breadcrumb: {
      show: boolean;
      left: 'left' | 'center' | 'right';
      top: 'top' | 'center' | 'bottom';
      itemStyle: {
        textStyle: ComponentData.TFontConfig;
        color: ComponentData.TColorConfig;
      };
    };
  };
  animation: ComponentData.ComponentChartAnimationConfig;
  condition: ComponentData.ComponentConditionConfig;
};
