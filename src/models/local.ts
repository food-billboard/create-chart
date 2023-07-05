import { mergeWithoutArray } from '@/utils';

export default {
  namespace: 'local',

  state: {
    componentCollapse: false,
    componentConfigCollapse: false,
    debug: {
      show: true,
      showComponentId: true,
    },
    // ? 设计器的操作loading 属于是操作禁用，不会有ui的效果
    globalActionLoading: false,
  },

  effects: {
    // 组件列表折叠
    // 组件配置折叠
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
  },

  reducers: {
    saveData(state: any, action: any) {
      const newState = mergeWithoutArray({}, state, action.payload);
      return newState;
    },
  },
};
