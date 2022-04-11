export type TClockGaugeConfig = {
  series: {
    center: [number, number];
    radius: number;
    axisLine: {
      lineStyle: {
        width: number;
        color: ComponentData.TColorConfig;
      };
    };
    splitLine: {
      color: ComponentData.TColorConfig;
      width: number;
      length: number;
    };
    axisTick: {
      show: boolean;
      length: number;
      lineStyle: {
        color: ComponentData.TColorConfig;
        width: number;
      };
    };
    axisLabel: {
      show: boolean;
      distance: number;
    } & ComponentData.TFontConfig;
    minuteAnchor: {
      itemStyle: {
        borderWidth: number;
        borderColor: ComponentData.TColorConfig;
      };
    };
    secondAnchor: {
      size: number;
      itemStyle: {
        color: ComponentData.TColorConfig;
      };
    };
    hourPointer: {
      length: number;
      width: number;
      itemStyle: {
        color: ComponentData.TColorConfig;
      };
    };
    minutePointer: {
      length: number;
      width: number;
      itemStyle: {
        color: ComponentData.TColorConfig;
      };
    };
    secondPointer: {
      length: number;
      width: number;
      itemStyle: {
        color: ComponentData.TColorConfig;
      };
    };
  };
};
