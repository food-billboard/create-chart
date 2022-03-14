export type TTreeMapBasicConfig = {
  tooltip: ComponentData.ComponentTooltip;
  series: {
    nodeClick: false | 'zoomToNode';
    squareRatio: number;
    label: ComponentData.ComponentSeriesLabelConfig & {
      formatter: string;
    };
    upperLabel: ComponentData.ComponentSeriesLabelConfig & {
      formatter: string;
    };
    breadcrumb: {
      show: boolean;
      left: 'left' | 'center' | 'right';
      top: 'top' | 'center' | 'bottom';
      height: number;
      itemStyle: {
        textStyle: ComponentData.TFontConfig;
        color: ComponentData.TColorConfig;
      };
    };
    labelLine: {
      show: boolean;
      length2: number;
      lineStyle: {
        width: number;
        type: ComponentData.ComponentLineStyle;
      };
    };
  };
  animation: ComponentData.ComponentChartAnimationConfig;
};
