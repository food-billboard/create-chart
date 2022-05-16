export type TLineBarConfig = {
  grid: ComponentData.ComponentGrid;
  legend: Omit<ComponentData.ComponentLegend, 'type'>;
  xAxis: ComponentData.ComponentXAxis;
  yAxis: Omit<ComponentData.ComponentYAxis, 'position'>;
  yAxis2: Omit<ComponentData.ComponentYAxis, 'position'>;
  tooltip: ComponentData.ComponentTooltip & {
    animation: ComponentData.ComponentTooltipAnimation;
  };
  series: {
    label: Omit<ComponentData.ComponentSeriesLabelConfig, 'position'>;
    style: {
      bar: {
        barWidth: 'auto' | number;
        borderRadius: number;
      };
      line: {
        smooth: boolean;
        lineWidth: number;
      };
    };
    itemStyle: {
      bar: {
        color: ComponentData.TGradientColorConfig;
      };
      line: {
        color: ComponentData.TColorConfig;
        areaColor: ComponentData.TGradientColorConfig;
      };
    }[];
  };
  animation: {
    line: ComponentData.ComponentChartAnimationConfig;
    bar: ComponentData.ComponentChartAnimationConfig;
  };
  condition: ComponentData.ComponentCondition[];
};
