import { getMockKindList } from '@/services';

// 存放来自后台的全局变量

export default class {
  mockValueKindMap: API_MOCK.TGetMockKindListData[] = [];

  // 获取后台mock数据的数据格式类型列表
  async getMockValueKindMap() {
    const response = await getMockKindList();
    this.mockValueKindMap = response;
    return response;
  }
}
