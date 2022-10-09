export type TLuckyDrawConfig = {
  global: {
    style: {
      background: ComponentData.TColorConfig;
    } & ComponentData.TFontConfig;
    config: {
      speed: number;
    };
  };
  buttons: {
    type: 'custom_1' | 'custom_2';
    content: string;
    textStyle: ComponentData.TFontConfig;
  };
  prizes: {
    size: {
      width: number;
      height: number;
    };
    config: {
      background: ComponentData.TColorConfig;
    }[];
  };
  blocks: {
    type: 'custom_1' | 'custom_2';
  };
  condition: ComponentData.ComponentConditionConfig;
};
