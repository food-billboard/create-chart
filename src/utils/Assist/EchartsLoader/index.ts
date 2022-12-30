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
  return import(/* webpackChunkName: "ECHARTS" */ 'echarts').then((data) => {
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

export function RadialGradient() {
  return ECHARTS.graphic.RadialGradient;
}

export function LinearGradient() {
  return ECHARTS.graphic.LinearGradient;
}
