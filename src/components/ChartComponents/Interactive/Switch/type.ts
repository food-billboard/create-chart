export type TSwitchConfig = {
  offColor: ComponentData.TColorConfig;
  onColor: ComponentData.TColorConfig;
  offHandleColor: ComponentData.TColorConfig;
  onHandleColor: ComponentData.TColorConfig;
  uncheckedIcon: {
    show: boolean;
    type: 'icon' | 'text';
    value: string;
    color: ComponentData.TColorConfig;
  };
  checkedIcon: {
    show: boolean;
    type: 'icon' | 'text';
    value: string;
    color: ComponentData.TColorConfig;
  };
  boxShadow: ComponentData.TBoxShadow;
  activeBoxShadow: ComponentData.TBoxShadow;
  defaultChecked: boolean;
};
