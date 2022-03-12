export type TTimeMachineConfig = {
  textStyle: ComponentData.TFontConfig;
  icon: {
    show: boolean;
    value: string;
    color: ComponentData.TColorConfig;
    size: number;
    margin: number;
    position: 'before' | 'after';
  };
  formatter: string;
};
