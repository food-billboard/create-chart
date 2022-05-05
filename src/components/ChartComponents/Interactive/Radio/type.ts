export type TRadioConfig = {
  borderColor: ComponentData.TColorConfig;
  backgroundColor: ComponentData.TColorConfig;
  textStyle: ComponentData.TFontConfig;
  size: number;
  defaultChecked: string;
  active: {
    borderColor: ComponentData.TColorConfig;
    backgroundColor: ComponentData.TColorConfig;
  };
  check: {
    color: ComponentData.TColorConfig;
  };
};
