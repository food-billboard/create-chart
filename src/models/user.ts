import { stringify } from 'querystring';
import { history } from 'umi';
import { message } from '@/components/Message';
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
import { getPageQuery } from '@/utils';
import {
  setErrorOriginUser,
  unsetErrorOriginUser,
} from '@/utils/Assist/ErrorBoundary';
import GlobalConfig from '@/utils/Assist/GlobalConfig';

export default {
  namespace: 'user',

  state: {
    currentUser: {},
  },

  effects: {
    //获取用户信息
    *getUserInfo(_: any, { call, put }: { call: any; put: any }) {
      // @ts-ignore
      const response = yield call(getUserInfo);
      yield put({
        type: 'saveCurrentUser',
        payload: response,
      });
      if (!GlobalConfig.IS_STATIC) setErrorOriginUser(response);
      return response;
    },

    //登录
    *login(
      { payload }: { payload: LoginParamsType },
      { call, put }: { call: any; put: any },
    ) {
      // @ts-ignore
      yield call(accountLogin, payload);

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
    },

    //退出登录
    *logout(_: any, { call, put }: { call: any; put: any }) {
      try {
        yield call(outLogin);
      } catch (err) {}

      const { redirect } = getPageQuery();
      yield put({
        type: 'saveCurrentUser',
        payload: {},
      });
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
    },

    //注册
    *register(
      { payload }: { payload: RegisterParamsType },
      { call }: { call: any },
    ) {
      // @ts-ignore
      const response = yield call(register, payload);

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
    },

    //重置密码
    *forger(
      { payload }: { payload: ResetParamsType },
      { call }: { call: any },
    ) {
      // @ts-ignore
      const response = yield call(forgetPassword, payload);
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
    },
  },

  reducers: {
    saveCurrentUser(state: any, action: any) {
      return {
        ...state,
        currentUser: action.payload || {},
      };
    },
  },
};
