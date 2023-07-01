export type TSelectConfig = {
  defaultValue: string;
  base: {
    textStyle: ComponentData.TFontConfig;
    backgroundColor: ComponentData.TColorConfig;
    height: number;
  };
  baseHover: {
    textStyle: ComponentData.TFontConfig;
    backgroundColor: ComponentData.TColorConfig;
  };
  activeHover: {
    textStyle: ComponentData.TFontConfig;
    backgroundColor: ComponentData.TColorConfig;
  };
  activeSelect: {
    textStyle: ComponentData.TFontConfig;
    backgroundColor: ComponentData.TColorConfig;
  };
  active: {
    textStyle: ComponentData.TFontConfig;
    backgroundColor: ComponentData.TColorConfig;
    border: ComponentData.ComponentLineGroupConfig;
  };
  placeholder: {
    textStyle: ComponentData.TFontConfig;
  };
  menu: {
    height: number;
    backgroundColor: ComponentData.TColorConfig;
  };
  indicator: {
    fontSize: number;
    color: ComponentData.TColorConfig;
  };
};
