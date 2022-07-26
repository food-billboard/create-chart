export type TPercentBarConfig = {
  grid: ComponentData.ComponentGrid;
  tooltip: ComponentData.ComponentTooltip;
  series: {
    itemStyle: {
      color: ComponentData.TGradientColorConfig;
      label: {
        show: boolean;
        formatter: {
          name: ComponentData.TFontConfig & {
            show: boolean;
          };
          value: ComponentData.TFontConfig & {
            show: boolean;
            addonAfter: {
              show: boolean;
              value: string;
            };
          };
        };
      };
    }[];
    barWidth: number;
    borderRadius: number;
  };
  animation: ComponentData.ComponentChartAnimationConfig;
  condition: ComponentData.ComponentConditionConfig;
};
