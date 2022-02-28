import { omit } from 'lodash';

export const BASIC_DEFAULT_CONFIG: ComponentData.TBaseConfig = {
  style: {
    width: 200,
    height: 200,
    left: 0,
    top: 0,
    opacity: 1,
    rotate: 0,
    zIndex: 2,
  },
  attr: {
    visible: true,
    lock: false,
  },
};

export const BASIC_DEFAULT_DATA_CONFIG: ComponentData.TBaseConfig['data'] = {
  request: {
    url: '',
    method: 'GET',
    headers: '{}',
    body: '{}',
    frequency: {
      show: false,
      value: 5,
    },
    type: 'static',
    value: [],
    valueType: 'array',
  },
  filter: {
    show: false,
    value: [],
    map: [],
  },
};

export const BASIC_DEFAULT_INTERACTIVE_CONFIG: ComponentData.TBaseConfig['interactive'] =
  {
    base: [],
  };

export const DEFAULT_FONT_CONFIG: ComponentData.TFontConfig = {
  color: {
    r: 33,
    g: 33,
    b: 33,
  },
  fontSize: 12,
  fontWeight: 'normal',
  fontFamily: 'sans-serif',
};

// legend
export const DEFAULT_LEGEND_CONFIG: ComponentData.ComponentLegend = {
  type: 'plain',
  show: true,
  orient: 'horizontal',
  itemGap: 10,
  textStyle: DEFAULT_FONT_CONFIG,
  left: 'auto',
  top: 'auto',
  right: 'auto',
  bottom: 'auto',
};

// grid
export const DEFAULT_GRID_CONFIG: ComponentData.ComponentGrid = {
  left: 10,
  top: 0,
  right: 10,
  bottom: 0,
  show: false,
  backgroundColor: {
    r: 0,
    g: 0,
    b: 0,
    a: 0,
  },
};

// xAxis
export const DEFAULT_X_AXIS_CONFIG: ComponentData.ComponentXAxis = {
  show: true,
  position: 'bottom',
  axisLabel: {
    show: true,
    rotate: 0,
    margin: 8,
    ...DEFAULT_FONT_CONFIG,
  },
};

// yAxis
export const DEFAULT_Y_AXIS_CONFIG: ComponentData.ComponentYAxis = {
  ...omit(DEFAULT_X_AXIS_CONFIG, 'position'),
  position: 'left',
};

// tooltip
export const DEFAULT_TOOLTIP_CONFIG: ComponentData.ComponentTooltip = {
  show: true,
  formatter: undefined,
  backgroundColor: {
    r: 50,
    g: 50,
    b: 50,
    a: 0.7,
  },
  textStyle: {
    ...DEFAULT_FONT_CONFIG,
    color: {
      r: 255,
      g: 255,
      b: 255,
    },
    fontSize: 14,
  },
};
