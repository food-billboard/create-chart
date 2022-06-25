import request from '../utils/request';

// mock数据格式列表
export const getMockKindList = () => {
  return [
    {
      id: '0',
      value: '人名',
      description: '人的名字',
    },
  ];
  return request<API_MOCK.TGetMockKindListData>('/api/screen/mock/kind', {
    method: 'GET',
  });
};
