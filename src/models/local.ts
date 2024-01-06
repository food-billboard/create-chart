import { mergeWithoutArray } from '@/utils';

export default {
  namespace: 'local',

  state: {
    // 组件列表是否折叠
    componentCollapse: false,
    // 组件搜索是否折叠
    componentSearchCollapse: true,
    // 组件配置是否折叠
    componentConfigCollapse: false,
    // 图层是否折叠
    layerCollapse: true,
    debug: {
      show: true,
      showComponentId: true,
    },
    // ? 设计器的操作loading 属于是操作禁用，不会有ui的效果
    globalActionLoading: false,
    // logger
    loggerMode: false,
  },

  effects: {
    // 组件列表折叠
    // 组件配置折叠
    // 图层折叠
    *setLocalConfig({ value }: any, { call, put }: { call: any; put: any }) {
      yield put({
        type: 'saveData',
        payload: value,
      });
    },

    // 全局操作loading
    *setGlobalActionLoading({ value }: any, { put }: { put: any }) {
      yield put({
        type: 'saveData',
        payload: {
          globalActionLoading: !!value,
        },
      });
    },

    // debug
    *setDebug({ value }: any, { put }: { put: any }) {
      yield put({
        type: 'saveData',
        payload: {
          debug: value,
        },
      });
    },
    // 日志模式
    *setLoggerModel({ value }: any, { put }: { put: any }) {
      yield put({
        type: 'saveData',
        payload: {
          loggerMode: !!value,
        },
      });
    },
  },

  reducers: {
    saveData(state: any, action: any) {
      const newState = mergeWithoutArray({}, state, action.payload);
      return newState;
    },
  },
};
