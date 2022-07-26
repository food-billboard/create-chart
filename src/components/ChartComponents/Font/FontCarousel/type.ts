export type TFontCarouselConfig = {
  textStyle: ComponentData.TFontConfig;
  speed: number;
  direction: 'left' | 'right';
  play: boolean;
  pauseOnHover: boolean;
  delay: number;
  condition: ComponentData.ComponentConditionConfig;
};
