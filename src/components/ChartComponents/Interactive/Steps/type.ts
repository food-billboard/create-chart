export type TStepsConfig = {
  click: {
    show: boolean;
  };
  direction: 'horizontal' | 'vertical';
  labelPlacement: 'horizontal' | 'vertical';
  icons: {
    wait: string;
    finish: string;
    error: string;
    progress: string;
  }[];
  style: {
    finish: {
      textStyle: ComponentData.TFontConfig;
      lineStyle: {
        color: ComponentData.TColorConfig;
      };
    };
    progress: {
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
