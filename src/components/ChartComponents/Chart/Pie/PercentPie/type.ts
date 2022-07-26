export type TPercentPieConfig = {
  statistics: {
    show: boolean;
    textStyle: ComponentData.TFontConfig;
    addonAfter: {
      show: boolean;
      value: string;
      textStyle: ComponentData.TFontConfig;
    };
  };
  lineStyle: {
    color: {
      line: ComponentData.TColorConfig;
      point: ComponentData.TColorConfig;
    }[];
    point: {
      size: number;
    };
    line: {
      width: number;
    };
  };
  series: {
    itemStyle: {
      color: ComponentData.TColorConfig[];
    };
    backgroundColor: ComponentData.TColorConfig;
    radius: {
      inner: [number, number];
      outer: [number, number];
    };
  };
  animation: {
    scrollTimes: number;
  };
  condition: ComponentData.ComponentConditionConfig;
};
