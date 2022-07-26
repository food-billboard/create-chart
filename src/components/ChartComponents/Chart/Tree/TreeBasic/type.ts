export type TTreeBasicConfig = {
  tooltip: ComponentData.ComponentTooltip & {
    animation: ComponentData.ComponentTooltipAnimation;
  };
  series: {
    layout: 'orthogonal' | 'radial';
    orient: 'LR' | 'TB' | 'BT' | 'RL';
    symbol: ComponentData.ComponentSymbol;
    symbolSize: string;
    defaultSymbolSize: number;
    label: Omit<ComponentData.ComponentSeriesLabelConfig, 'position'> & {
      formatter: string;
    };
    labelLayout: {
      hideOverlap: boolean;
      // moveOverlap: 'shiftX' | 'shiftY'
      // draggable: boolean
    };
    lineStyle: {
      width: number;
      curveness: number;
    };
    itemStyle: {
      color: ComponentData.TColorConfig[];
    };
  };
  animation: ComponentData.ComponentChartAnimationConfig;
  condition: ComponentData.ComponentConditionConfig;
};
