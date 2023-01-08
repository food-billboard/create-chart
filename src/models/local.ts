import { mergeWithoutArray } from '@/utils';

export default {
  namespace: 'local',

  state: {
    componentCollapse: false,
    componentConfigCollapse: false,
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
  },

  reducers: {
    saveData(state: any, action: any) {
      const newState = mergeWithoutArray(state, action.payload);
      return newState;
    },
  },
};
