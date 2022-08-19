import { mergeWithoutArray } from '@/utils';

export default {
  namespace: 'local',

  state: {
    componentCollapse: false,
  },

  effects: {
    // 组件列表折叠
    *setComponentCollapse(
      { value }: any,
      { call, put }: { call: any; put: any },
    ) {
      yield put({
        type: 'saveData',
        payload: {
          componentCollapse: !!value,
        },
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
