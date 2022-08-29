import request from '../utils/request';

// 获取天气
export const getWeatherData = (data: API_THIRD.TWeatherParams) => {
  return request<API_THIRD.TWeatherData>('/api/third/request', {
    method: 'POST',
    data: {
      params: {
        ...data,
        _id: '630c7f824fa77520a214a75d',
      },
    },
  });
};
