export type TPathBasicConfig = {
  close: boolean;
  target: {
    type: 'circle' | 'rect' | 'custom';
    circle: {
      radius: number;
      color: ComponentData.TColorConfig;
    };
    rect: {
      width: number;
      height: number;
      color: ComponentData.TColorConfig;
    };
    custom: {
      width: number;
      height: number;
      value: string;
    };
  };
  animation: {
    type: 'to' | 'from' | 'to-from' | 'from-to';
    opacity: 'none' | '0-1' | '1-0' | '0-1-0' | '1-0-1';
    autoRotate: boolean;
    moveType:
      | 'linear'
      | 'easeInQuad'
      | 'easeInSine'
      | 'easeOutSine'
      | 'easeInOutCubic';
    speed: number;
  };
  path: {
    show: boolean;
    line: 'dashed' | 'solid';
    dashedValue: string;
    width: number;
    color: ComponentData.TColorConfig;
  };
  condition: ComponentData.ComponentConditionConfig;
};
