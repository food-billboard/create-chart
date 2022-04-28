export type TStateCardConfig = {
  margin: number;
  textStyle: ComponentData.TFontConfig;
  stateList: {
    value: string;
    stateIcon: {
      color: ComponentData.TColorConfig;
    };
  }[];
  stateIcon: {
    position: 'start' | 'end';
    borderRadius: number;
    rotate: number;
    margin: number;
    size: [number, number];
  };
  condition: ComponentData.ComponentCondition[];
};
