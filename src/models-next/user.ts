import { stringify } from 'querystring';
import { history } from 'umi';
import { message } from 'antd';
import {
  getUserInfo,
  forgetPassword,
  register,
  LoginParamsType,
  accountLogin,
  RegisterParamsType,
  ResetParamsType,
  outLogin,
} from '@/services';
import GlobalConfig from '@/utils/Assist/GlobalConfig';
import { getPageQuery } from '@/utils';
import {
  setErrorOriginUser,
  unsetErrorOriginUser,
} from '@/utils/Assist/ErrorBoundary';

export default class {
  currentUser: any = {};

  //获取用户信息
  async getUserInfo() {
    const response = await getUserInfo();
    this.currentUser = response;
    if (!GlobalConfig.IS_STATIC) setErrorOriginUser(response);
    return response;
  }

  //登录
  async login(payload: LoginParamsType) {
    await accountLogin(payload);

    // Login successfully
    const urlParams = new URL(window.location.href);
    const params = getPageQuery();
    let { redirect } = params as { redirect: string };
    if (redirect) {
      const redirectUrlParams = new URL(redirect);
      if (redirectUrlParams.origin === urlParams.origin) {
        redirect = redirect.substr(urlParams.origin.length);
        if (redirect.match(/^\/.*#/)) {
          redirect = redirect.substr(redirect.indexOf('#') + 1);
        }
      } else {
        window.location.href = '/';
        return;
      }
    }
    history.replace(redirect || '/');
  }

  //退出登录
  async logout() {
    try {
      await outLogin();
    } catch (err) {}

    const { redirect } = getPageQuery();
    this.currentUser = {};
    // Note: There may be security issues, please note
    if (window.location.pathname !== '/login' && !redirect) {
      history.replace({
        pathname: '/login',
        search: stringify({
          redirect: window.location.href,
        }),
      });
    }
    if (!GlobalConfig.IS_STATIC) unsetErrorOriginUser();
  }

  //注册
  async register(payload: RegisterParamsType) {
    const response: any = await register(payload);

    //注册成功跳转至登录
    if (!!response.token) {
      message.success({
        content: '注册成功',
        duration: 1.5,
        onClose: () => {
          history.replace('/login');
        },
      });
    }
  }

  //重置密码
  async forget(payload: ResetParamsType) {
    const response: any = await forgetPassword(payload);
    //重置成功跳转至登录
    if (response.status === 'ok') {
      message.success({
        content: '重置成功',
        duration: 1.5,
        onClose: () => {
          history.replace('/login');
        },
      });
    }
  }
}
