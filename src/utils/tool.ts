import { parse } from 'querystring';
import { mergeWith } from 'lodash';

/* eslint no-useless-escape:0 import/prefer-default-export:0 */
const reg =
  /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/;

export const isUrl = (path: string): boolean => reg.test(path);

export const getPageQuery = () => parse(window.location.href.split('?')[1]);

export const getLocalStorage = (key: string) => {
  const data = localStorage.getItem(key);
  if (!data) return undefined;
  const realData: any = JSON.parse(data);
  const { timestamp, data: target } = realData;
  const now = Date.now();
  if (timestamp) {
    if (now >= timestamp) {
      localStorage.removeItem(key);
      return undefined;
    }
    return target;
  }
  return target;
};

export const setLocalStorage = (
  key: string,
  value: any,
  timestamp: false | number = false,
) => {
  const data = JSON.stringify({
    data: value,
    ...(!timestamp ? {} : { timestamp: timestamp + Date.now() }),
  });
  localStorage.setItem(key, data);
};

export const removeLocalStorage = (key: string) => {
  localStorage.removeItem(key);
};

// 处理query 传参的时候导致的空字符串查询问题（后端不愿意给处理）
export const formatQuery = (query: any = {}) => {
  const ret: any = {};
  Object.keys(query).forEach((key) => {
    if (query[key] !== null && query[key] !== undefined && query[key] !== '') {
      ret[key] = query[key];
    }
  });
  return ret;
};

export function withTry<T = any>(func: Function) {
  return async function (...args: any[]): Promise<[any, T | null]> {
    try {
      const data = await func(...args);
      return [null, data];
    } catch (err) {
      return [err, null];
    }
  };
}

export async function sleep(time: number = 1000) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

// 特殊合并，取消array相加
export function mergeWithoutArray(...args: any[]) {
  // @ts-ignore
  return mergeWith(...args, (value, srcValue) => {
    if (Array.isArray(value)) {
      return srcValue;
    }
  });
}

export const getShare = (id: string) => {
  const { origin, pathname } = new URL(location.href);
  const url = origin + pathname + '#/share?id=' + id;
  return url;
};

// 预览
export function goPreview(id: string) {
  const { origin, pathname } = new URL(location.href);
  const url = origin + pathname + '#/preview?id=' + id;
  window.open(url, '_blank');
}

// 分享
export function goShare(id: string) {
  const url = getShare(id);
  window.open(url, '_blank');
}

// 设计页面
export function goDesign(id?: string) {
  const { origin, pathname } = new URL(location.href);
  const baseUrl = origin + pathname + '#/designer';
  const url = id ? baseUrl + '?id=' + id : baseUrl;
  window.open(url, '_blank');
}
