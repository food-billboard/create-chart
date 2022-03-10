export type TFunnelBasicConfig = {
  legend: Omit<ComponentData.ComponentLegend, 'type'>;
  tooltip: ComponentData.ComponentTooltip;
  series: ComponentData.PositionType & {
    min: number;
    max: number;
    minSize: number;
    maxSize: number;
    label: Omit<ComponentData.ComponentSeriesLabelConfig, 'position'> & {
      formatter: string;
      position: 'inside' | 'outside';
    };
    labelLine: {
      show: boolean;
      length: number;
      lineStyle: {
        width: number;
        type: ComponentData.ComponentLineStyle;
      };
    };
    itemStyle: {
      color: ComponentData.TColorConfig[];
    };
  };
  animation: ComponentData.ComponentChartAnimationConfig;
};
