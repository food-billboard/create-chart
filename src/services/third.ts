import request from '../utils/request';

// mock数据格式列表
export const getWeatherData = (data: API_THIRD.TWeatherParams) => {
  return request<API_THIRD.TWeatherData>('/api/third/weather', {
    method: 'POST',
    data,
  });
};
