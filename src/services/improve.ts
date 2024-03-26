import request from '../utils/request';

// 文件上传
export async function uploadFileImprove(file: File) {
  const formData = new FormData();
  formData.append('file', file);
  return request('/api/collections/media/records', {
    method: 'POST',
    data: formData,
    improve: true,
  });
}

// 获取媒体资源列表
export async function getMediaList(params: API_IMPROVE.MediaParams) {
  const { current, pageSize } = params;
  return request<API_IMPROVE.MediaDataRes>('/api/collections/media/records', {
    method: 'GET',
    params: {
      page: current,
      perPage: pageSize,
    },
    improve: true,
  });
}

// ! 暂时没用
// 获取媒体资源分类列表
export async function getMediaClassicList() {
  return request('/api/screen/model', {
    method: 'GET',
    improve: true,
  });
}

// ! 暂时没用
// 删除媒体资源分类
export async function deleteClassic(classic: string) {
  return request('/api/screen/model', {
    method: 'DELETE',
    params: {
      classic,
    },
    improve: true,
  });
}

// ! 暂时没用
// 新增媒体资源分类
export async function addClassic(data: API_IMPROVE.AddMediaClassicParams) {
  return request('/api/screen/model', {
    method: 'POST',
    data,
    improve: true,
  });
}

// ! 暂时没用
// 修改媒体资源分类
export async function updateClassic(data: API_IMPROVE.UpdateMediaClassParams) {
  return request('/api/screen/model', {
    method: 'PUT',
    data,
    improve: true,
  });
}

// 新增媒体资源
export async function addMediaData(data: API_IMPROVE.AddMediaDataParams) {
  return request('/api/screen/model', {
    method: 'POST',
    data,
    improve: true,
  });
}

// 删除媒体资源
export async function deleteMediaData(
  params: API_IMPROVE.DeleteMediaDataParams,
) {
  const { value, classic } = params;
  return request(`/api/files/${classic}/${'records'}/${value}`, {
    method: 'DELETE',
    params,
    improve: true,
  });
}

// 快照列表
export async function getScreenShotList(
  params: API_IMPROVE.GetScreenShotListParams,
) {
  return request('/api/screen/model', {
    method: 'GET',
    params,
    improve: true,
  });
}

// 当前快照详情
export async function getCurrentScreenShotData(
  params: API_SCREEN.TGetScreenDetail,
) {
  return request('/api/screen/model', {
    method: 'GET',
    params,
    improve: true,
  });
}

// 删除快照
export async function deleteScreenShot(params: {
  _id: string;
  screen: string;
}) {
  return request('/api/screen/model', {
    method: 'DELETE',
    params,
    improve: true,
  });
}

// 更新快照
export async function updateScreenShot(data: API_IMPROVE.UpdateScreenShotData) {
  return request('/api/screen/model', {
    method: 'PUT',
    data,
    improve: true,
  });
}

// 新增快照
export async function addScreenShot(data: { _id: string }) {
  return request('/api/screen/model', {
    method: 'POST',
    data,
    improve: true,
  });
}

// 使用快照
export async function useScreenShot(data: { _id: string; screen: string }) {
  return request('/api/screen/model', {
    method: 'PUT',
    data,
    improve: true,
  });
}

// 覆盖快照
export async function coverScreenShot(data: { _id: string; screen: string }) {
  return request('/api/screen/model', {
    method: 'PUT',
    data,
    improve: true,
  });
}
