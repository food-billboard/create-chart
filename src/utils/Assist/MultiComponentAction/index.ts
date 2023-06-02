import { debounce, throttle } from 'lodash';
import { GLOBAL_EVENT_EMITTER_FACTORY, EVENT_NAME_MAP } from '../EventEmitter';

export class MultiComponentAction extends GLOBAL_EVENT_EMITTER_FACTORY {
  static DRAG_START = EVENT_NAME_MAP.MULTIPLE_COMPONENT_DRAG_START;
  static DRAG = EVENT_NAME_MAP.MULTIPLE_COMPONENT_DRAG;
  static DRAG_STOP = EVENT_NAME_MAP.MULTIPLE_COMPONENT_DRAG_STOP;
  static RESIZE_START = EVENT_NAME_MAP.MULTIPLE_COMPONENT_RESIZE_START;
  static RESIZE = EVENT_NAME_MAP.MULTIPLE_COMPONENT_RESIZE;
  static RESIZE_STOP = EVENT_NAME_MAP.MULTIPLE_COMPONENT_RESIZE_STOP;

  _emitDebounce: any = (type: string, ...args: any[]) => {
    this.emit(type, ...args);
  };

  emitDebounce = debounce(this._emitDebounce, 100);

  _emitThrottle: any = (type: string, ...args: any[]) => {
    this.emit(type, ...args);
  };

  emitThrottle = throttle(this._emitThrottle, 100);
}

const instance = new MultiComponentAction();

// 组件判断是否被选中，选中的绑定对应的事件
// 被操作的组件触发对应的事件，让别的绑定的组件接收到
// 接收到事件的组件计算相关的参数啥的

export default instance;
