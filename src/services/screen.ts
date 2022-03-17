import request from '../utils/request';

// 大屏详情
export const getScreenDetail = (params: API_SCREEN.TGetScreenDetail) => {
  return request<ComponentData.TScreenData>('/', {
    method: 'GET',
    params,
  });
};

// 大屏列表
export const getScreenList = (params: API_SCREEN.TGetScreenListParams) => {
  return {
    list: [
      {
        id: '1',
        description: '2222',
        name: '333333',
        flag: 'WEB',
        group: '',
        poster:
          'https://t7.baidu.com/it/u=3880246827,1075616560&fm=190&app=60&f=PNG?w=121&h=75&s=FF88F00A05927C694EC1484E0300F0F2',
        share: {
          open: false,
        },
        enable: false,
      },
      {
        id: '2',
        description: '333',
        name: '333333'.repeat(10),
        flag: 'WEB',
        group: '',
        poster:
          'https://t7.baidu.com/it/u=3880246827,1075616560&fm=190&app=60&f=PNG?w=121&h=75&s=FF88F00A05927C694EC1484E0300F0F2',
        share: {
          open: true,
          time: 288888888,
        },
        enable: true,
      },
      {
        id: '3',
        description: '333',
        name: '333333'.repeat(10),
        flag: 'WEB',
        group: '',
        poster:
          'https://t7.baidu.com/it/u=3880246827,1075616560&fm=190&app=60&f=PNG?w=121&h=75&s=FF88F00A05927C694EC1484E0300F0F2',
        share: {
          open: true,
          time: 288888888,
        },
        enable: true,
      },
      {
        id: '4',
        description: '333',
        name: '333333',
        flag: 'H5',
        group: '',
        poster:
          'https://t7.baidu.com/it/u=3880246827,1075616560&fm=190&app=60&f=PNG?w=121&h=75&s=FF88F00A05927C694EC1484E0300F0F2',
        share: {
          open: false,
        },
        enable: true,
      },
    ],
    total: 0,
  };
  return request<API_SCREEN.TGetScreenListRes>('/', {
    method: 'GET',
    params,
  });
};

// 大屏删除
export const deleteScreen = (params: API_SCREEN.TDeleteScreenParams) => {
  return request('/', {
    method: 'DELETE',
    params,
  });
};

// 大屏预览
export const previewScreen = (params: API_SCREEN.TPreviewScreenParams) => {
  return request('/', {
    method: 'GET',
    params,
  });
};

// 大屏设置有效时间
// 分享
// 设置公共或加密
// 设置有效时间
export const shareScreen = (params: API_SCREEN.TShareScreenParams) => {
  return request('/', {
    method: 'GET',
    params,
  });
};

// 大屏分享关闭
export const closeShareScreen = (
  params: API_SCREEN.TCloseShareScreenParams,
) => {
  return request('/', {
    method: 'DELETE',
    params,
  });
};

// 大屏启用
export const enableScreen = (data: API_SCREEN.TEnableScreenParams) => {
  return request('/', {
    method: 'PUT',
    data,
  });
};

// 大屏禁用
export const disabledScreen = (params: API_SCREEN.TDisabledScreenParams) => {
  return request('/', {
    method: 'DELETE',
    params,
  });
};
