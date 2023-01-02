// import type * as echarts from 'echarts'

let ECHARTS: any;

type EChartsInitOpts = {
  locale?: string | any;
  renderer?: 'canvas' | 'svg';
  devicePixelRatio?: number;
  useDirtyRect?: boolean;
  useCoarsePointer?: boolean;
  pointerSize?: number;
  ssr?: boolean;
  width?: number;
  height?: number;
};

export async function echartsLoader() {
  return import('echarts').then((data) => {
    ECHARTS = data;
    return data;
  });
}

export function init(
  dom: HTMLElement,
  theme?: string | object,
  opts?: EChartsInitOpts,
): echarts.EChartsType {
  return ECHARTS.init(dom, theme, opts);
}

let loadedMap: string[] = [];
export function registerMap(mapName: string, ...args: any[]) {
  if (loadedMap.includes(mapName)) return;
  loadedMap.push(mapName);
  return ECHARTS.registerMap(mapName, ...args);
}

export function RadialGradient(x: any, y: any, r: any, colorStops: any) {
  return new ECHARTS.graphic.RadialGradient(x, y, r, colorStops);
}

export function LinearGradient(
  x: any,
  y: any,
  x1: any,
  y1: any,
  colorStops: any,
) {
  return new ECHARTS.graphic.LinearGradient(x, y, x1, y1, colorStops);
}
