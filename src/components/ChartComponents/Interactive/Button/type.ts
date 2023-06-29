export type TButtonConfig = {
  textStyle: ComponentData.TFontConfig;
  backgroundColor: ComponentData.TColorConfig;
  icon: string;
  borderRadius: number;
  type: 'primary' | 'default';
  actionType: 'submit' | 'normal';
  condition: ComponentData.ComponentConditionConfig;
};
