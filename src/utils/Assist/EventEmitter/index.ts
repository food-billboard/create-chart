import EventEmitter from 'eventemitter3';

export const GLOBAL_EVENT_EMITTER = new EventEmitter();

export enum EVENT_NAME_MAP {
  // 组件被删除的时候
  COMPONENT_DELETE_ACTION,

  // 组件被添加的时候
  COMPONENT_ADD_ACTION,
}
