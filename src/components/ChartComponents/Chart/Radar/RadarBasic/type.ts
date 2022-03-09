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
    nameGap: number;
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
        color: ComponentData.TColorConfig;
      };
    };
  };
  series: {
    symbol: ComponentData.ComponentSymbol;
    symbolSize: number;
    label: Omit<ComponentData.ComponentSeriesLabelConfig, 'position'> & {
      formatter: string;
      position: 'outside' | 'inside';
    };
    itemStyle: {
      color: ComponentData.TColorConfig[];
    };
    lineStyle: {
      color: ComponentData.TColorConfig[];
      width: number;
      type: ComponentData.ComponentLineStyle;
    }[];
    areaStyle: {
      color: ComponentData.TColorConfig[];
    };
  };
  animation: ComponentData.ComponentChartAnimationConfig;
};
