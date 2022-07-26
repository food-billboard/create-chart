export type TTitleConfig = {
  textStyle: ComponentData.TFontConfig;
  align: {
    vertical: 'flex-start' | 'flex-end' | 'center';
    horizontal: 'flex-start' | 'flex-end' | 'center';
  };
  orient: 'vertical-lr' | 'lr';
  animation: {
    show: boolean;
    value: string;
    speed:
      | 'animate__slow'
      | 'animate__slower'
      | 'animate__fast'
      | 'animate__faster';
    delay: `animate__delay-${2 | 3 | 4 | 5}s`;
    repeat: `animate__repeat-${1 | 2 | 3}` | 'animate__infinite';
  };
  condition: ComponentData.ComponentConditionConfig;
};
