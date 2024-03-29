export type TCountUpNumberConfig = {
  textStyle: ComponentData.TFontConfig;
  align: {
    vertical: 'flex-start' | 'flex-end' | 'center';
    horizontal: 'flex-start' | 'flex-end' | 'center';
  };
  addonBefore: {
    show: boolean;
    content: string;
  };
  addonAfter: {
    show: boolean;
    content: string;
  };
  thousands: {
    show: boolean;
    content: string;
  };
  round: {
    show: boolean;
    length: number;
  };
  animation: {
    duration: number;
    easingFn: 'easeOutExpo' | 'outQuintic' | 'outCubic';
  };
  decimal: string;
  condition: ComponentData.ComponentConditionConfig;
};
