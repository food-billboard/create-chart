import request from '../utils/request';

// 获取媒体资源列表
export async function getMediaList(params: API_IMPROVE.MediaParams) {
  return request('/api/screen/model', {
    method: 'GET',
    params,
  });
}

// 获取媒体资源分类列表
export async function getMediaClassicList() {
  return request('/api/screen/model', {
    method: 'GET',
  });
}

// 删除媒体资源分类
export async function deleteClassic(classic: string) {
  return request('/api/screen/model', {
    method: 'DELETE',
    params: {
      classic,
    },
  });
}

// 新增媒体资源分类
export async function addClassic(data: API_IMPROVE.AddMediaClassicParams) {
  return request('/api/screen/model', {
    method: 'POST',
    data,
  });
}

// 修改媒体资源分类
export async function updateClassic(data: API_IMPROVE.UpdateMediaClassParams) {
  return request('/api/screen/model', {
    method: 'PUT',
    data,
  });
}

// 新增图片
export async function addMediaData(data: API_IMPROVE.AddMediaDataParams) {
  return request('/api/screen/model', {
    method: 'POST',
    data,
  });
}

// 删除图片
export async function deleteMediaData(
  params: API_IMPROVE.DeleteMediaDataParams,
) {
  return request('/api/screen/model', {
    method: 'DELETE',
    params,
  });
}
