import request from '../utils/request';
import { SCREEN_VERSION } from '../utils/constants';

const { REACT_APP_ENV } = process.env;

// 新增大屏
export const postScreen = (data: API_SCREEN.TAddScreenParams) => {
  return request('/api/screen/list', {
    method: 'POST',
    data: {
      ...data,
      version: SCREEN_VERSION,
    },
  });
};

// 修改大屏
export const putScreen = (data: API_SCREEN.TEditScreenParams) => {
  return request('/api/screen/list', {
    method: 'PUT',
    data: {
      ...data,
      version: SCREEN_VERSION,
    },
  });
};

// 大屏详情
export const getScreenDetail = (params: API_SCREEN.TGetScreenDetail) => {
  return request<API_SCREEN.TScreenDetail>('/api/screen/detail', {
    method: 'GET',
    params,
  });
};

// 大屏列表
export const getScreenList = (params: API_SCREEN.TGetScreenListParams) => {
  return request<any>('/api/screen/list', {
    method: 'GET',
    params,
    origin: true,
  });
};

// 大屏删除
export const deleteScreen = (params: API_SCREEN.TDeleteScreenParams) => {
  return request('/api/screen/list', {
    method: 'DELETE',
    params,
  });
};

// 大屏预览
export const previewScreen = (data: API_SCREEN.TPreviewScreenParams) => {
  return request('/api/screen/preview', {
    method: 'POST',
    data,
  });
};

// 大屏预览验证
export const previewScreenValid = (params: API_SCREEN.TPreviewScreenParams) => {
  return request('/api/screen/preview/valid', {
    method: 'GET',
    params,
  });
};

// 大屏复制 | 大屏模板使用
export const copyScreen = (data: { _id: string; type: 'screen' | 'model' }) => {
  return request('/api/screen/copy', {
    method: 'POST',
    data,
  });
};

// 大屏设置有效时间
// 分享
// 设置公共或加密
// 设置有效时间
export const shareScreen = (data: API_SCREEN.TShareScreenParams) => {
  return request('/api/screen/share', {
    method: 'POST',
    data,
  });
};

// 大屏分享关闭
export const closeShareScreen = (
  params: API_SCREEN.TCloseShareScreenParams,
) => {
  return request('/api/screen/share', {
    method: 'DELETE',
    params,
  });
};

// 大屏分享心跳检测
export const shareScreenHeartbeat = (
  params: API_SCREEN.TShareScreenHeartbeatParams,
) => {
  return request('/api/screen/share', {
    method: 'GET',
    params,
  });
};

// 大屏分享权限信息获取
export const shareScreenGet = (params: API_SCREEN.TShareScreenGetParams) => {
  return request<API_SCREEN.TShareScreenGetData>('/api/screen/share/valid', {
    method: 'GET',
    params,
    mis: false,
  });
};

// 大屏分享权限验证
export const shareScreenPost = (data: API_SCREEN.TShareScreenPostParams) => {
  return request('/api/screen/share/valid', {
    method: 'POST',
    data: {
      ...data,
      env: REACT_APP_ENV || 'prod',
    },
  });
};

// 大屏启用
export const enableScreen = (data: API_SCREEN.TEnableScreenParams) => {
  return request('/api/screen/enable', {
    method: 'PUT',
    data,
  });
};

// 大屏禁用
export const disabledScreen = (params: API_SCREEN.TDisabledScreenParams) => {
  return request('/api/screen/enable', {
    method: 'DELETE',
    params,
  });
};

// 服务端代理数据请求
export const preRequestData = (data: API_SCREEN.TPreRequestDataParams) => {
  return request('/api/screen/pre/request', {
    method: 'POST',
    data,
  });
};

// 大屏导入
export const postScreenLeadIn = (data: API_SCREEN.TPreLeadInDataParams) => {
  return request('/api/screen/pre/leadin', {
    method: 'POST',
    data,
  });
};

// 大屏导出
export const postScreenExport = (data: API_SCREEN.TPreExportDataParams) => {
  return request('/api/screen/pre/export', {
    method: 'POST',
    data,
    responseType: 'arraybuffer',
    origin: true,
  });
};
