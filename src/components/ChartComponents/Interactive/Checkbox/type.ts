export type TCheckboxConfig = {
  borderColor: ComponentData.TColorConfig;
  borderRadius: number;
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
