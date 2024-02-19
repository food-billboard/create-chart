import { message } from 'antd';
import { mergeWith } from 'lodash';
import { parse } from 'querystring';
import semver from 'semver';
import { history } from 'umi';

/* eslint no-useless-escape:0 import/prefer-default-export:0 */
const reg =
  /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/;

export const isUrl = (path: string): boolean => reg.test(path);

export const getPageQuery = () => parse(window.location.href.split('?')[1]);

export function getLocationQuery(customSearch?: string): {
  [key: string]: string;
} {
  const search = customSearch || history.location.search;
  return parse(search.startsWith('?') ? search.slice(1) : search) as any;
}

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

// 计算字符长度
export function stringLength(string: string) {
  return new Array(string.length).fill(0).reduce((acc, cur, index) => {
    if (string.charCodeAt(index) > 127 || string.charCodeAt(index) === 94) {
      acc += 2;
    } else {
      acc++;
    }
    return acc;
  }, 0);
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

// 模板预览
export function goPreviewModel(id: string) {
  const { origin, pathname } = new URL(location.href);
  const url = origin + pathname + '#/model-preview?id=' + id;
  window.open(url, '_blank');
}

// 预览
export function goPreview(id: string) {
  const { origin, pathname } = new URL(location.href);
  const url = origin + pathname + '#/preview?id=' + id;
  window.open(url, '_blank');
}

// 无差别预览
export function goView() {
  const { origin, pathname } = new URL(location.href);
  const url = origin + pathname + '#/viewer';
  window.open(url, '_blank');
}

// 静态版本生产环境预览
export function goStaticProductionView() {
  const { origin, pathname } = new URL(location.href);
  const url = origin + pathname + '#/static-share?skipUpload=1';
  window.open(url, '_blank');
}

// 分享
export function goShare(id: string) {
  const url = getShare(id);
  window.open(url, '_blank');
}

// 是否为设计页面
export function isDesignerPage(hash = location.hash) {
  return hash.startsWith('#/designer') || hash.startsWith('#/model-designer');
}

// 设计页面
export function goDesign(id?: string) {
  const { origin, pathname } = new URL(location.href);
  const baseUrl = origin + pathname + '#/designer';
  const url = id ? baseUrl + '?id=' + id : baseUrl;
  window.open(url, '_blank');
}

// 模板设计页面
export function goDesignModel(id?: string) {
  const { origin, pathname } = new URL(location.href);
  const baseUrl = origin + pathname + '#/model-designer';
  const url = id ? baseUrl + '?id=' + id : baseUrl;
  window.open(url, '_blank');
}

// 关闭页面
export function closeWindow() {
  const userAgent = navigator.userAgent.toLowerCase();
  if (userAgent.includes('firefox') || userAgent.includes('chrome')) {
    window.location.href = 'about:blank';
    window.close();
  } else {
    window.opener = null;
    window.open('', '_self');
    window.close();
  }
}

// 版本号比较
// a > b ?
export function versionCompare(
  versionA: string | number,
  versionB: string | number,
) {
  let stringVersionA =
    typeof versionA === 'number' ? versionA.toString() : versionA;
  let stringVersionB =
    typeof versionB === 'number' ? versionB.toString() : versionB;

  try {
    stringVersionA = semver.coerce(stringVersionA)?.version || '';
    stringVersionB = semver.coerce(stringVersionB)?.version || '';
    return semver.gt(stringVersionA, stringVersionB);
  } catch (err) {
    throw new Error('version parse error');
  }

  // const [topA, subA] = stringVersionA.split('.').map((item) => parseInt(item));
  // const [topB, subB] = stringVersionB.split('.').map((item) => parseInt(item));
  // if (topA > topB) return true;
  // if (topA === topB) return subA >= subB;
  // return false;
}
