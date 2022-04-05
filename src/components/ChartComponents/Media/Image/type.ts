export type TImageConfig = {
  type: 'image' | 'color';
  content: string | ComponentData.TColorConfig;
  repeat: {
    x: boolean;
    y: boolean;
  };
  condition: ComponentData.ComponentCondition[];
};
