import request from '../utils/request';

// 获取数据源列表
export async function getDataSourceList(
  params: API_DATA_MANAGE.DataSourceParams,
) {
  return request('/api/screen/model', {
    method: 'GET',
    params,
  });
}

// 删除数据源列表
export async function deleteDataSource(params: { _id: string }) {
  return request('/api/screen/model', {
    method: 'DELETE',
    params,
  });
}

// 新增数据源
export async function postDataSource(
  data: API_DATA_MANAGE.PostDataSourceParams,
) {
  return request('/api/screen/model', {
    method: 'POST',
    data,
  });
}

// 编辑数据源
export async function updateDataSource(
  data: API_DATA_MANAGE.UpdateDataSourceParams,
) {
  return request('/api/screen/model', {
    method: 'PUT',
    data,
  });
}

// 数据源测试
export async function getTestDataSource(
  data: { _id: string } | API_DATA_MANAGE.PostDataSourceParams,
) {
  return request('/api/screen/model', {
    method: 'POST',
    data,
  });
}
