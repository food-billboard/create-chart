import EventEmitter from 'eventemitter3';
import { debounce, throttle } from 'lodash';
class GLOBAL_EVENT_EMITTER_FACTORY extends EventEmitter {
  _emitDebounce: any = (type: string, ...args: any[]) => {
    this.emit(type, ...args);
  };

  emitDebounce = debounce(this._emitDebounce, 100);

  _emitThrottle: any = (type: string, ...args: any[]) => {
    this.emit(type, ...args);
  };

  emitThrottle = throttle(this._emitThrottle, 100);
}

export const GLOBAL_EVENT_EMITTER = new GLOBAL_EVENT_EMITTER_FACTORY();

export enum EVENT_NAME_MAP {
  // 组件被删除的时候
  COMPONENT_DELETE_ACTION = 'COMPONENT_DELETE_ACTION',

  // 组件被添加的时候
  COMPONENT_ADD_ACTION = 'COMPONENT_ADD_ACTION',

  // 组件过滤发生改变的时候
  COMPONENT_FILTER_CHANGE = 'COMPONENT_FILTER_CHANGE',

  // 组件拖拽开始
  COMPONENT_DRAG_START = 'COMPONENT_DRAG_START',

  // 组件拖拽
  COMPONENT_DRAG = 'COMPONENT_DRAG',

  // 组件拖拽结束
  COMPONENT_DRAG_END = 'COMPONENT_DRAG_END',

  // 组件缩放开始
  COMPONENT_RESIZE_START = 'COMPONENT_RESIZE_START',

  // 组件缩放
  COMPONENT_RESIZE = 'COMPONENT_RESIZE',

  // 组件缩放结束
  COMPONENT_RESIZE_END = 'COMPONENT_RESIZE_END',

  // 大屏的主题色被更改的时候
  SCREEN_THEME_CHANGE = 'SCREEN_THEME_CHANGE',

  // 图层被展示或收起的时候
  LAYER_VISIBLE_CHANGE = 'LAYER_VISIBLE_CHANGE',
}
