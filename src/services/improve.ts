import request from '../utils/request';

// 获取内置背景列表
export async function getInternalBackgroundList(
  params: API_IMPROVE.InternalBackgroundParams,
) {
  return request('/api/screen/model', {
    method: 'GET',
    params,
  });
}
