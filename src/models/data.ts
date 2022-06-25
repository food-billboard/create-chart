import { getMockKindList } from '@/services';
import { mergeWithoutArray } from '@/utils';

// 存放来自后台的全局变量

export default {
  namespace: 'data',

  state: {
    mockValueKindMap: [],
  },

  effects: {
    // 获取后台mock数据的数据格式类型列表
    *getMockValueKindMap(_: any, { call, put }: { call: any; put: any }) {
      // @ts-ignore
      const response = yield call(getMockKindList);
      yield put({
        type: 'saveData',
        payload: {
          mockValueKindMap: response,
        },
      });
      return response;
    },
  },

  reducers: {
    saveData(state: any, action: any) {
      const newState = mergeWithoutArray(state, action.payload);
      return newState;
    },
  },
};
