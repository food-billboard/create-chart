export type TScatterMapConfig = {
  geo: {
    center: [number, number];
    itemStyle: {
      normal: {
        borderColor: ComponentData.TColorConfig;
        borderWidth: number;
        areaColor: ComponentData.TGradientColorConfig;
        shadowColor: ComponentData.TColorConfig;
        shadowOffsetX: number;
        shadowOffsetY: number;
        shadowBlur: number;
      };
      emphasis: {
        borderColor: ComponentData.TColorConfig;
        borderWidth: number;
        areaColor: ComponentData.TGradientColorConfig;
        shadowColor: ComponentData.TColorConfig;
        shadowOffsetX: number;
        shadowOffsetY: number;
        shadowBlur: number;
      };
    };
  };
  scatter: {
    effectType: 'ripple';
    rippleEffect: {
      color: ComponentData.TColorConfig;
      number: number;
      period: number;
      scale: number;
      brushType: 'stroke' | 'fill';
    };
    label: Omit<ComponentData.ComponentSeriesLabelConfig, 'position'> & {
      formatter: string;
    };
    symbol: ComponentData.ComponentSymbol;
    symbolSize: number;
    itemStyle: {
      color: ComponentData.TColorConfig;
    };
  };
  tooltip: ComponentData.ComponentTooltip & {
    animation: ComponentData.ComponentTooltipAnimation;
  };
  condition: ComponentData.ComponentCondition[];
};
