export type TGaugeBasicConfig = {
  series: {
    min: number;
    max: number;
    splitNumber: number;
    center: [number, number];
    radius: number;
    startAngle: number;
    endAngle: number;
    axisLine: {
      show: boolean;
      lineStyle: {
        width: number;
      };
    };
    progress: {
      show: boolean;
      color: ComponentData.TColorConfig;
      width: number;
    };
    splitLine: {
      show: boolean;
      color: ComponentData.TColorConfig;
      width: number;
      length: number;
    };
    axisTick: {
      show: boolean;
      splitNumber: number;
      length: number;
      lineStyle: {
        color: ComponentData.TColorConfig;
        width: number;
        type: ComponentData.ComponentLineStyle;
      };
    };
    axisLabel: {
      show: boolean;
      distance: number;
    } & ComponentData.TFontConfig;
    pointer: {
      show: boolean;
      length: number;
      width: number;
      itemStyle: {
        color: ComponentData.TColorConfig;
      };
    };
    title: {
      show: boolean;
      offsetCenter: [number, number];
    } & ComponentData.TFontConfig;
    detail: {
      show: boolean;
      valueAnimation: boolean;
    } & ComponentData.TFontConfig;
  };
  animation: ComponentData.ComponentChartAnimationConfig;
};
