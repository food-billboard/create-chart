import request from '../utils/request';

// 新增大屏
export const postScreenModel = (data: API_SCREEN.TAddScreenParams) => {
  return request('/api/screen/model', {
    method: 'POST',
    data,
  });
};

// 修改大屏
export const putScreenModel = (data: API_SCREEN.TEditScreenParams) => {
  return request('/api/screen/model', {
    method: 'PUT',
    data,
  });
};

// 大屏详情
export const getScreenModelDetail = (params: API_SCREEN.TGetScreenDetail) => {
  return request<API_SCREEN.TScreenDetail>('/api/screen/model/detail', {
    method: 'GET',
    params,
  });
};

// 大屏列表
export const getScreenModelList = (params: API_SCREEN.TGetScreenListParams) => {
  return request<any>('/api/screen/model', {
    method: 'GET',
    params,
    origin: true,
  });
};

// 大屏删除
export const deleteScreenModel = (params: API_SCREEN.TDeleteScreenParams) => {
  return request('/api/screen/model', {
    method: 'DELETE',
    params,
  });
};

// 大屏预览
export const previewScreenModel = (data: API_SCREEN.TPreviewScreenParams) => {
  return request('/api/screen/model/preview', {
    method: 'POST',
    data,
  });
};

// 大屏预览验证
export const previewScreenModelValid = (
  params: API_SCREEN.TPreviewScreenParams,
) => {
  return request('/api/screen/model/preview/valid', {
    method: 'GET',
    params,
  });
};

// 大屏启用
export const enableScreenModel = (data: API_SCREEN.TEnableScreenParams) => {
  return request('/api/screen/model/enable', {
    method: 'PUT',
    data,
  });
};

// 大屏禁用
export const disabledScreenModel = (
  params: API_SCREEN.TDisabledScreenParams,
) => {
  return request('/api/screen/model/enable', {
    method: 'DELETE',
    params,
  });
};
