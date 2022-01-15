export const DEFAULT_COLOR: ComponentData.TColorConfig = {
  r: 0,
  g: 0,
  b: 0,
  a: 1,
};

export const DEFAULT_GRADIENT_COLOR: ComponentData.TGradientColorConfig = {
  start: DEFAULT_COLOR,
  end: DEFAULT_COLOR,
  direction: 0,
};

export const DEFAULT_BACKGROUND_CONFIG: ComponentData.TBackgroundConfig = {
  type: 'color',
  color: {
    r: 0,
    g: 0,
    b: 0,
    a: 0,
  },
  background: '',
};
