export type TTextConfig = {
  textStyle: ComponentData.TFontConfig & {
    lineHeight: number;
    letterSpacing: number;
    textAlign: 'left' | 'right' | 'justify';
    textIndent: number;
  };
  animation: {
    show: boolean;
    speed: number;
  };
  condition: ComponentData.ComponentCondition[];
};
