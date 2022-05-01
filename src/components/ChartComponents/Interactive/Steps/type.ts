export type TStepsConfig = {
  click: {
    show: boolean;
  };
  defaultCurrent: number;
  carousel: {
    show: boolean;
    loop: boolean;
    speed: number;
  };
  size: number;
  direction: 'horizontal' | 'vertical';
  labelPlacement: 'horizontal' | 'vertical';
  icons: {
    wait: string;
    finish: string;
    error: string;
    process: string;
  }[];
  style: {
    finish: {
      textStyle: ComponentData.TFontConfig;
      lineStyle: {
        color: ComponentData.TColorConfig;
      };
    };
    process: {
      textStyle: ComponentData.TFontConfig;
      lineStyle: {
        color: ComponentData.TColorConfig;
      };
    };
    wait: {
      textStyle: ComponentData.TFontConfig;
      lineStyle: {
        color: ComponentData.TColorConfig;
      };
    };
    error: {
      textStyle: ComponentData.TFontConfig;
      lineStyle: {
        color: ComponentData.TColorConfig;
      };
    };
  };
};
