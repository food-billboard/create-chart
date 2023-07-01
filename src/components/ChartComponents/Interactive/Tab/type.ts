export type TTabConfig = {
  defaultValue: string;
  base: {
    textStyle: ComponentData.TFontConfig;
    backgroundColor: ComponentData.TColorConfig;
    border: ComponentData.ComponentLineGroupConfig;
  };
  active: {
    textStyle: ComponentData.TFontConfig;
    backgroundColor: ComponentData.TColorConfig;
    border: ComponentData.ComponentLineGroupConfig;
  };
  loop: {
    show: boolean;
    speed: number;
  };
};
