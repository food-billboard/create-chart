import { request } from '@/utils';
import { merge } from 'lodash';

const { REACT_APP_ENV } = process.env;

export interface LoginParamsType {
  username: string;
  password: string;
  mobile: string;
  captcha: string;
  type: string;
}

export interface RegisterParamsType
  extends Pick<LoginParamsType, 'mobile' | 'password' | 'captcha'> {
  email: string;
}

export interface ResetParamsType
  extends Pick<RegisterParamsType, 'email' | 'password' | 'captcha'> {}

// 获取当前用户信息
export async function getUserInfo() {
  return request<any>('/api/customer/manage', {
    method: 'GET',
    mis: false,
  });
}

// 登录
export async function accountLogin(
  params: Pick<LoginParamsType, 'mobile' | 'password'>,
) {
  return request<any>('/api/user/logon/account', {
    method: 'POST',
    data: merge(params, { env: REACT_APP_ENV || 'prod' }),
    mis: false,
  });
}

// 邮箱验证码
export async function getCaptcha(email: string, type: 'register' | 'forget') {
  return request(`/api/user/logon/email`, {
    method: 'POST',
    data: {
      email,
      type,
    },
  });
}

// 退出登录
export async function outLogin() {
  return request('/api/user/logon/signout', {
    method: 'POST',
  });
}

// 忘记密码
export async function forgetPassword(params: ResetParamsType) {
  return request('/api/user/logon/forget', {
    method: 'PUT',
    data: params,
  });
}

// 注册
export async function register(params: RegisterParamsType) {
  return request('/api/user/logon/register', {
    method: 'POST',
    data: params,
  });
}
