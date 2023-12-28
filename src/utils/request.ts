import axios, { AxiosRequestConfig } from 'axios';
import { debounce } from 'lodash';
import { stringify } from 'querystring';
import { history } from 'umi';
import { message, notification } from '@/components/Message';
import { useAnyDva } from '@/hooks';
import { REQUEST_TIMEOUT } from './constants';
import { formatQuery } from './tool';

const codeMessage = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  405: '请求方法不被允许。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};

interface RequestOptions extends AxiosRequestConfig {
  mis?: boolean;
  origin?: boolean;
}

// 未登录的多次触发处理
export const dispatchLogin = debounce(
  function (err) {
    const { dispatch } = useAnyDva();
    const querystring = stringify({
      redirect: window.location.href,
    });
    history.replace(`/login?${querystring}`);
    if (dispatch) {
      dispatch({ type: 'user/logout' });
    }
    message.error(err.msg || '未登录请先登录');
  },
  1000,
  { leading: true, trailing: false },
);

// 处理报错
export const misManage = (error: any) => {
  if (error.messageType === 'body') {
    const err = error.err || {};

    // 未登录处理
    if (error.errorType === 'system' && err.code === '401') {
      return dispatchLogin(err);
    }
    message.error(err.msg || '网络错误');
    return;
  }
  const { response } = error;
  if (response && response.status === 401) {
    return dispatchLogin(error);
  }
  if (response && response.status) {
    const errorText =
      (codeMessage as any)[response.status] || response.statusText;
    const {
      status,
      url,
      request: { responseURL },
    } = response;
    notification.error({
      message: `请求错误 ${status}: ${responseURL}`,
      description: errorText,
    });
  } else if (!response) {
    notification.error({
      description: '您的网络发生异常，无法连接服务器',
      message: '网络异常',
    });
  }
};

const request = async <ResBody>(
  url: string,
  setting: RequestOptions = {} as RequestOptions,
) => {
  // 过滤URL参数
  const { params, mis = true, origin, ...options } = setting;

  let body: any;
  let error: any;

  try {
    body = await axios.request({
      url,
      timeout: REQUEST_TIMEOUT,
      ...options,
      ...(params ? { params: formatQuery(params) } : {}),
    });
  } catch (err) {
    error = err;
  }

  // 报错分为两种，
  // 系统错误，由 httpClient 拦截到的错误 如，4xx，5xx
  if (error) {
    error.errorType = 'system';
    error.messageType = 'response';
    mis && (await misManage(error));
    throw error;
  }

  // 业务错误，客户端返回的 statusCode === 200 但是response.body 中的success 返回为 false的错误
  if (body && body.success === false) {
    error = body;
    error.errorType = 'logic';
    error.messageType = 'body';
  }

  // 返回真正的response body res 内容
  if (!error) {
    return (origin ? body : body?.data?.res?.data ?? {}) as ResBody;
  }
  error.mis = mis;
  mis && (await misManage(error));
  throw error;
};

export default request;
