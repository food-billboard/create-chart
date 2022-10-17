import request from '../utils/request';
import { SCREEN_MODEL_VERSION } from '../utils/constants';

// 新增大屏模板
export const postScreenModel = (data: API_SCREEN.TAddScreenParams) => {
  return request('/api/screen/model', {
    method: 'POST',
    data: {
      ...data,
      version: SCREEN_MODEL_VERSION,
    },
  });
};

// 修改大屏模板
export const putScreenModel = (data: API_SCREEN.TEditScreenParams) => {
  return request('/api/screen/model', {
    method: 'PUT',
    data: {
      ...data,
      version: SCREEN_MODEL_VERSION,
    },
  });
};

// 链式修改大屏
export const putScreenModelPool = (data: API_SCREEN.TEditScreenPoolParams) => {
  return request('/api/screen/list/pool/model', {
    method: 'PUT',
    data: {
      ...data,
      version: SCREEN_MODEL_VERSION,
    },
  });
};

// 大屏模板详情
export const getScreenModelDetail = (params: API_SCREEN.TGetScreenDetail) => {
  return request<API_SCREEN.TScreenDetail>('/api/screen/model/detail', {
    method: 'GET',
    params,
  });
};

// 大屏模板列表
export const getScreenModelList = (params: API_SCREEN.TGetScreenListParams) => {
  return request<any>('/api/screen/model', {
    method: 'GET',
    params,
    origin: true,
  });
};

// 大屏模板删除
export const deleteScreenModel = (params: API_SCREEN.TDeleteScreenParams) => {
  return request('/api/screen/model', {
    method: 'DELETE',
    params,
  });
};

// 大屏模板预览
export const previewScreenModel = (data: API_SCREEN.TPreviewScreenParams) => {
  return request('/api/screen/model/preview', {
    method: 'POST',
    data,
  });
};

// 大屏模板预览验证
export const previewScreenModelValid = (
  params: API_SCREEN.TPreviewScreenParams,
) => {
  return request('/api/screen/model/preview/valid', {
    method: 'GET',
    params,
  });
};

// 大屏模板启用
export const enableScreenModel = (data: API_SCREEN.TEnableScreenParams) => {
  return request('/api/screen/model/enable', {
    method: 'PUT',
    data,
  });
};

// 大屏模板禁用
export const disabledScreenModel = (
  params: API_SCREEN.TDisabledScreenParams,
) => {
  return request('/api/screen/model/enable', {
    method: 'DELETE',
    params,
  });
};
