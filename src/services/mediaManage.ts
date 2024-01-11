import request from '../utils/request';

//
export const getMediaClassicList = async () => {
  return request<API_MOCK.TGetMockKindListData[]>('/api/screen/mock/params', {
    method: 'GET',
  }).then((data) => {
    return data.map((item: any) => {
      return {
        id: item._id,
        value: item.data_kind,
        description: item.description,
      };
    });
  });
};
