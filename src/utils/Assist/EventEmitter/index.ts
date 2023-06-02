import EventEmitter from 'eventemitter3';
import { debounce, throttle } from 'lodash';
// 组件拖拽删除添加等相关事件
import ComponentAboutEvent from './ComponentAbout.event';

export class GLOBAL_EVENT_EMITTER_FACTORY extends EventEmitter {
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

export const EVENT_NAME_MAP = {
  ...ComponentAboutEvent,
};
