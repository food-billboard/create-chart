export type TWeatherConfig = {
  align: {
    vertical: 'flex-start' | 'flex-end' | 'center';
    horizontal: 'flex-start' | 'flex-end' | 'center';
  };
  show: ('info' | 'temperature' | 'humidity' | 'direct' | 'power' | 'aqi')[];
  textStyle: ComponentData.TFontConfig;
  widMap: {
    show: boolean;
    value: {
      wid: string;
      icon?: string;
      weather?: string;
      color?: ComponentData.TColorConfig;
    }[];
  };
};
