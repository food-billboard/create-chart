export type TLuckyDrawConfig = {
  global: {
    style: {
      background: ComponentData.TColorConfig;
    } & ComponentData.TFontConfig;
    config: {
      speed: number;
      stop: number;
    };
  };
  buttons: {
    type: 'custom_1' | 'custom_2';
    content: string;
    textStyle: ComponentData.TFontConfig;
    color: ComponentData.TColorConfig;
  };
  prizes: {
    config: {
      background: ComponentData.TColorConfig;
    }[];
  };
  blocks: {
    type: 'custom_1' | 'custom_2';
  };
  condition: ComponentData.ComponentConditionConfig;
};
