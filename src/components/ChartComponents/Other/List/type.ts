export type TListConfig = {
  global: {
    animation: {
      show: boolean;
      type: 'column' | 'page';
      speed: number;
      autoplaySpeed: number;
    };
    column: number;
  };
  header: {
    show: boolean;
    height: number;
    backgroundColor: ComponentData.TColorConfig;
    textStyle: ComponentData.TFontConfig;
  };
  index: {
    show: boolean;
    backgroundColor: ComponentData.TColorConfig;
    width: number;
    radius: number;
    textStyle: ComponentData.TFontConfig;
    size: number;
  };
  columns: {
    margin: number;
    even: {
      backgroundColor: ComponentData.TColorConfig;
    };
    odd: {
      backgroundColor: ComponentData.TColorConfig;
    };
    data: {
      key: string;
      name: string;
      width: number;
      type: 'image' | 'text' | 'number-point';
      textStyle: ComponentData.TFontConfig & {
        textAlign: 'left' | 'right' | 'center';
      };
      scroll: {
        show: boolean;
      };
      header: {
        textStyle?: ComponentData.TFontConfig;
        backgroundColor?: ComponentData.TColorConfig;
        show: boolean;
      };
    }[];
  };
  condition: ComponentData.ComponentConditionConfig;
};
