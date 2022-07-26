export type TWordCloudBasicConfig = {
  tooltip: ComponentData.ComponentTooltip;
  series: {
    shape:
      | 'cardioid'
      | 'circle'
      | 'diamond'
      | 'square'
      | 'triangle-forward'
      | 'triangle'
      | 'pentagon'
      | 'star';
    maskImage?: string;
    keepAspect: boolean;
    textStyle: Omit<ComponentData.TFontConfig, 'color' | 'fontSize'> & {
      color: {
        range: {
          r: [number, number];
          g: [number, number];
          b: [number, number];
        };
      };
    };
    sizeRange: [number, number];
    rotationRange: [number, number];
    rotationStep: number;
    gridSize: number;
    layoutAnimation: boolean;
  };
  condition: ComponentData.ComponentConditionConfig;
};
