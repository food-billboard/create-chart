export type TLoopTextConfig = {
  textStyle: ComponentData.TFontConfig;
  align: {
    vertical: 'flex-start' | 'flex-end' | 'center';
    horizontal: 'flex-start' | 'flex-end' | 'center';
  };
  animation: {
    interval: number;
    delay: number;
    // ? 好像有问题，先不要了
    // fade: boolean
    // ? 太难了看不懂，下次再说
    // springConfig: object
  };
  addonBefore: {
    show: boolean;
    value: string;
    textStyle: ComponentData.TFontConfig;
  };
  addonAfter: {
    show: boolean;
    value: string;
    textStyle: ComponentData.TFontConfig;
  };
  condition: ComponentData.ComponentConditionConfig;
};
