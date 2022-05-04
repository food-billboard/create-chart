export type TInputConfig = {
  border: ComponentData.ComponentLineGroupConfig;
  borderRadius: number;
  placeholder: {
    value: string;
    color: ComponentData.TColorConfig;
  };
  backgroundColor: ComponentData.TColorConfig;
  textStyle: ComponentData.TFontConfig;
  search: {
    show: boolean;
    value: string;
    width: number;
    backgroundColor: ComponentData.TColorConfig;
    textStyle: ComponentData.TFontConfig;
  };
};
