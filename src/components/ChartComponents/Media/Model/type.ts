export type TModelConfig = {
  position: {
    x: number;
    y: number;
    z: number;
  };
  focus: {
    x: number;
    y: number;
    z: number;
  };
  scale: number;
  color: ComponentData.TColorConfig;
  rotate: {
    show: boolean;
    speed: number;
  };
};
