export type TTagConfig = {
  margin: number;
  textStyle: ComponentData.TFontConfig;
  series: {
    color: ComponentData.TColorConfig;
    icon?: string;
  }[];
  icon: {
    position: 'start' | 'end';
    margin: number;
  };
  condition: ComponentData.ComponentConditionConfig;
};
