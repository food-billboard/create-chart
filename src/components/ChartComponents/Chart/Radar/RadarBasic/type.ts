export type TRadarBasicConfig = {
  legend: Omit<ComponentData.ComponentLegend, 'type'>;
  tooltip: ComponentData.ComponentTooltip;
  radar: {
    center: [number, number];
    radius: number;
    axisName: {
      show: boolean;
      formatter: string;
    } & ComponentData.TFontConfig;
    axisNameGap: number;
    splitNumber: number;
    shape: 'polygon' | 'circle';
    axisLine: {
      show: boolean;
      lineStyle: {
        color: ComponentData.TColorConfig;
        width: number;
        type: ComponentData.ComponentLineStyle;
      };
    };
    splitLine: {
      show: boolean;
      lineStyle: {
        color: ComponentData.TColorConfig;
        width: number;
        type: ComponentData.ComponentLineStyle;
      };
    };
    splitArea: {
      show: boolean;
      areaStyle: {
        color: [ComponentData.TColorConfig, ComponentData.TColorConfig];
      };
    };
  };
  series: {
    symbol: ComponentData.ComponentSymbol;
    symbolSize: number;
    label: ComponentData.ComponentSeriesLabelConfig & {
      formatter: string;
      distance: number;
    };
    itemStyle: {
      color: ComponentData.TColorConfig[];
    };
    lineStyle: {
      color: ComponentData.TColorConfig;
      width: number;
      type: ComponentData.ComponentLineStyle;
    }[];
    areaStyle: {
      color: ComponentData.TColorConfig[];
    };
  };
  animation: ComponentData.ComponentChartAnimationConfig;
};
