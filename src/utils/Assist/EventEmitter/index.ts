import EventEmitter from 'eventemitter3';
import pMap from 'p-map';
import { debounce, throttle } from 'lodash';
// 组件拖拽删除添加等相关事件
import ComponentAboutEvent from './ComponentAbout.event';

export class GLOBAL_EVENT_EMITTER_FACTORY extends EventEmitter {
  asyncEmit = async function (
    event: string,
    ...args: any[]
  ): Promise<any[] | null> {
    var evt = event;
    // @ts-ignore
    const that = this;

    if (!that._events[evt]) return null;

    const listeners = that._events[evt];
    let result: any[] = [];

    if (listeners.fn) {
      if (listeners.once)
        that.removeListener(event, listeners.fn, undefined, true);
      result = [listeners.fn.apply(listeners.context, args)];
    } else {
      result = listeners.map((listener: any) => {
        if (listener.once)
          that.removeListener(event, listener.fn, undefined, true);
        return listener.fn.apply(listener.context, args);
      });
    }

    return pMap(result, async (listener: any) => {
      return listener;
    });
  };

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
