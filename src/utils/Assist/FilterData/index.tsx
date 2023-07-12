import json5 from 'json5';
import mustache from 'mustache';
import { cloneDeep, get } from 'lodash';
import { preRequestData } from '@/services';
import {
  API_CONTAIN_PARAMS_LAZY_REQUEST_URL_FLAG,
  API_CONTAIN_PARAMS_IMMEDIATELY_REQUEST_URL_FLAG,
} from '../../constants/another';
import { getDvaGlobalModelData } from '../Component';
import VariableStringUtil from '../VariableString';
import request from '../../request';
import { MOCK_REQUEST_URL } from '../../index';
import Logger from '../Logger';

export const FILTER_STEP_MAP_DATA: {
  [id: string]: {
    data: any;
  };
} = {};

export class FilterData {
  // ? Hack
  // 一开始不会用到这个模块
  // 尝试一开始不加载Mock模块
  // 减少umi体积
  static Mock: any;

  static async loadMock() {
    if (FilterData.Mock) return;
    await import(/* webpackChunkName: "MOCK_JS" */ 'mockjs').then((module) => {
      FilterData.Mock = module;
    });
  }

  stringDataToObject(value: string, defaultValue = '{}') {
    try {
      return json5.parse(value);
    } catch (err) {
      return defaultValue;
    }
  }

  async pipeValueByCodeString(value: any, global: any, code: string) {
    try {
      const AsyncFunction = Object.getPrototypeOf(
        async function () {},
      ).constructor;
      let filterFunction = AsyncFunction('data', 'global', 'options', code);
      if (code.includes('options')) await FilterData.loadMock();
      const response = await filterFunction(value, global, {
        Mock: FilterData.Mock,
      });
      return {
        value: response,
        error: false,
      };
    } catch (err) {
      console.error(err);
      return {
        value,
        error: true,
        errorMsg: err,
      };
    }
  }

  // 过滤器执行
  async getPipeFilterValue(
    value: ComponentData.TComponentApiDataConfig,
    filter: ComponentData.TFilterConfig[],
    params: ComponentData.TParams[],
    constants: ComponentData.TConstants[],
    stringify: boolean = true,
  ) {
    const {
      filter: { value: filterData, show },
      request: { value: originData },
    } = value;

    const unDisabledFilterData = show
      ? filterData.filter((item) => !item.disabled)
      : [];
    const existsFilterData = unDisabledFilterData.filter((item) =>
      filter.some((filterData) => filterData.id === item.id),
    );

    let result: any = originData;

    // ? 现在尝试使用异步的形式执行过滤器
    for (let i = 0; i < existsFilterData.length; i++) {
      const cur = existsFilterData[i];
      const { id } = cur;
      const target = filter.find((item) => item.id === id);
      const { error, value, errorMsg } = await this.pipeValueByCodeString(
        result,
        VariableStringUtil.getAllGlobalParams(params, constants),
        target!.code,
      );
      result = value;

      FILTER_STEP_MAP_DATA[id] = cloneDeep(error ? errorMsg : result);

      if (error) {
        console.error(error);
        break;
      }
    }
    // existsFilterData.some((cur) => {
    //   const { id } = cur;
    //   const target = filter.find((item) => item.id === id);
    //   const { error, value, errorMsg } = this.pipeValueByCodeString(
    //     result,
    //     VariableStringUtil.getAllGlobalParams(params, constants),
    //     target!.code,
    //   );
    //   result = value;

    //   FILTER_STEP_MAP_DATA[id] = cloneDeep(error ? errorMsg : result);

    //   return error;
    // });

    if (!stringify) return result;

    try {
      return JSON.stringify(result);
    } catch (err) {
      return '{}';
    }
  }

  // 字段映射修改
  // 返回的数据和用户指定的字段映射修改
  getFieldMapValue(
    value: any,
    {
      map,
      deep = false,
    }: {
      map: ComponentData.TComponentMapData[];
      deep?: boolean;
    },
  ) {
    function needDeep(value: any) {
      if (
        Array.isArray(value) ||
        (typeof value === 'object' && value !== null && deep)
      ) {
        return format(value);
      }
      return value;
    }
    function format(value: any): any {
      if (Array.isArray(value)) {
        return value.map((item) => {
          return format(item);
        });
      } else if (typeof value === 'object') {
        return Object.entries(value).reduce<any>((acc, cur) => {
          const [key, value] = cur;
          const target = map.find((item) => item.map === key);
          if (target) {
            const { field } = target;
            acc[field] = needDeep(value);
          } else {
            acc[key] = needDeep(value);
          }
          return acc;
        }, {});
      } else {
        return value;
      }
    }

    try {
      return format(value);
    } catch (err) {
      console.error(err);
      return value;
    }
  }

  // 解析字符串对象变量
  parseVariableStringInObject(
    value: object,
    params: ComponentData.TParams[],
    constants: ComponentData.TConstants[],
  ) {
    return Object.entries(value).reduce<{ [key: string]: string }>(
      (acc, cur) => {
        const [key, value] = cur;
        acc[key] = this.parseVariableString(value, params, constants);
        return acc;
      },
      {},
    );
  }

  // 解析字符串变量
  parseVariableString(
    value: string,
    params: ComponentData.TParams[],
    constants: ComponentData.TConstants[],
  ) {
    return VariableStringUtil.variableStringToRealString(
      value,
      params,
      constants,
    );
  }

  // 解析变量body
  parseBody(
    value: string,
    params: ComponentData.TParams[],
    constants: ComponentData.TConstants[],
  ) {
    try {
      const body = json5.parse(value);
      return this.parseVariableStringInObject(body, params, constants);
    } catch {
      return {};
    }
  }

  // 解析变量headers
  parseHeaders(
    value: string,
    params: ComponentData.TParams[],
    constants: ComponentData.TConstants[],
  ) {
    try {
      const headers = json5.parse(value);
      return this.parseVariableStringInObject(headers, params, constants);
    } catch {
      return {};
    }
  }

  // 解析变量url
  parseUrl(
    value: string,
    params: ComponentData.TParams[],
    constants: ComponentData.TConstants[],
  ) {
    try {
      let parseUrl = value;
      while (parseUrl.includes(API_CONTAIN_PARAMS_LAZY_REQUEST_URL_FLAG)) {
        parseUrl = parseUrl.replace(
          API_CONTAIN_PARAMS_LAZY_REQUEST_URL_FLAG,
          '',
        );
      }
      while (
        parseUrl.includes(API_CONTAIN_PARAMS_IMMEDIATELY_REQUEST_URL_FLAG)
      ) {
        parseUrl = parseUrl.replace(
          new RegExp(
            `${API_CONTAIN_PARAMS_IMMEDIATELY_REQUEST_URL_FLAG}\\([0-9]+\\)`,
          ),
          '',
        );
      }
      parseUrl = this.parseVariableString(parseUrl, params, constants);
      return parseUrl;
    } catch {
      return '';
    }
  }

  requestLog(log: Logger.LoggerItem) {
    Logger.log(log);
  }

  async requestData(
    componentId: string,
    value: ComponentData.TComponentApiDataConfig,
    params: ComponentData.TParams[],
    constants: ComponentData.TConstants[],
  ) {
    const {
      filter: {},
      request: {
        method,
        url,
        headers,
        body,
        type,
        mock,
        value: responseData,
        serviceRequest,
      },
    } = value;

    let realUrl = this.parseUrl(url, params, constants);
    let realMethod = method?.toLowerCase() as any;
    let realBody = {};
    let realHeaders = {};
    const realServiceRequest = type === 'api' && serviceRequest;

    if (type === 'static' || (type === 'api' && !url)) {
      this.requestLog({
        type: 'request',
        url: 'static',
        method: 'static',
        params: {},
        headers: {},
        response: responseData,
        component: componentId,
        requestType: 'static',
      });
      return responseData;
    }

    let log: Partial<Logger.LoggerItem> = {
      component: componentId,
    };
    if (type === 'api') {
      const defaultRequestConfig: ComponentData.ScreenCommonRequestConfig =
        get(getDvaGlobalModelData(), 'screenData.config.attr.request') || {};
      realHeaders = this.parseHeaders(
        defaultRequestConfig.headers,
        params,
        constants,
      );
      realHeaders = {
        ...realHeaders,
        ...this.parseHeaders(headers, params, constants),
      };
      if (method === 'POST') {
        realBody = this.parseBody(defaultRequestConfig.body, params, constants);
        realBody = {
          ...realBody,
          ...this.parseBody(body, params, constants),
        };
      }
      log = {
        ...log,
        type: 'request',
        url: realUrl,
        method,
        params: realBody,
        headers: realHeaders,
        requestType: 'api',
      };
    } else if (type === 'mock') {
      realMethod = 'post';
      realUrl = MOCK_REQUEST_URL;
      realBody = {
        ...mock,
        random: mock.random ? '1' : '0',
      };
      log = {
        ...log,
        type: 'request',
        url: realUrl,
        method: realMethod,
        params: realBody,
        headers: {},
        requestType: 'mock',
      };
      // 需要的字段不完整时，不需要调用接口
      if (!mock.fields.filter((item) => !!item.key && !!item.dataKind).length) {
        this.requestLog({
          ...(log as Logger.LoggerItem),
          response: [],
        });
        return [];
      }
    }

    try {
      let result: any;

      // 服务端代理请求
      if (realServiceRequest) {
        result = await preRequestData({
          method: realMethod,
          body: JSON.stringify(realBody) || '{}',
          header: JSON.stringify(realHeaders) || '{}',
          url: realUrl,
        });
        this.requestLog({
          ...(log as Logger.LoggerItem),
          response: result,
        });
      } else {
        result = await request(realUrl, {
          method: realMethod,
          data: realBody,
          headers: realHeaders as any,
          mis: false,
        });
        this.requestLog({
          ...(log as Logger.LoggerItem),
          response: result,
        });
      }
      return result;
    } catch (err) {
      console.error('-----------error generate start-----------');
      console.error(`request error for: ${url}`);
      console.error(err);
      console.error('-----------error generate end-----------');
      this.requestLog({
        ...(log as Logger.LoggerItem),
        response: responseData,
        error: err,
      });
      return responseData;
    }
  }
}

const filterUtil = new FilterData();

type TFilterData = ComponentData.TFilterConfig &
  ComponentData.TComponentFilterConfig;

function hashChangeListenerBind() {
  let bind = false;
  let list: any = {};
  return function (id: string, callback: any) {
    list[id] = callback;
    if (bind) return;
    bind = true;
    window.addEventListener('hashchange', (e) => {
      VariableStringUtil.getAllUrlParams();
      Object.values(list).forEach((item: any) => {
        item(e);
      });
    });
  };
}

const hashChangeListenerBindFunc = hashChangeListenerBind();

// 检查变更并更新
export class CompareFilterUtil {
  constructor(
    {
      id,
      componentFilter,
      componentCondition,
      componentConstants,
      componentParams,
      url,
      onParams,
      onFilter,
      onFetch,
      onCondition,
      onHashChange,
    }: {
      componentFilter: ComponentData.TComponentFilterConfig[];
      componentCondition: ComponentData.ComponentCondition[];
      componentConstants: ComponentData.TConstants[];
      componentParams: string[];
      url: string;
      id: string;
      onParams: (targetParam: ComponentData.TParams[], newValue: any) => void;
      onFilter: () => Promise<any>;
      onFetch: () => Promise<any>;
      onHashChange: (e: any) => void;
      onCondition: (condition: ComponentData.ComponentCondition) => void;
    },
    filter: ComponentData.TFilterConfig[],
    defaultValue: ComponentData.TParams[],
  ) {
    this.prevParams = defaultValue;
    this.condition = componentCondition;
    this.constants = componentConstants;
    this.componentParams = componentParams;
    this.onFetch = onFetch;
    this.onFilter = onFilter;
    this.onCondition = onCondition;
    this.onParams = onParams;
    this.initComponentFilter(filter, componentFilter);
    this.initParamsMap(url, this.filter, this.condition);
    // hash 值改变监听
    hashChangeListenerBindFunc(id, onHashChange);
  }

  onFilter;
  onFetch;
  onCondition;
  onParams;

  // 组件过滤函数的集合
  filter: TFilterData[] = [];
  condition;
  constants;
  componentParams;
  mapParams: {
    [variable: string]: {
      action: Function[];
      index: {
        type: 'params' | 'constants' | 'href';
        value: any;
        getValue: (params?: ComponentData.TParams[]) => any;
        getOrigin: (params?: ComponentData.TParams[]) => any;
      };
      value?: string;
    };
  } = {};
  prevParams: ComponentData.TParams[] = [];

  getVariableInString(
    value: string,
    withKey = false,
  ): string[] | [string, string][] {
    try {
      // * 暂时只支持变量，不支持条件和循环
      const map = mustache.parse(value).filter((item) => item[0] === 'name');
      return (withKey ? map : map.map((item) => item[1])) as
        | string[]
        | [string, string][];
    } catch (err) {
      return [];
    }
  }

  // 过滤器初始化
  initComponentFilter(
    filter: ComponentData.TFilterConfig[],
    componentFilter: ComponentData.TComponentFilterConfig[],
  ) {
    const templateComponentFilter = [
      ...componentFilter.filter((item) => !item.disabled),
    ];
    this.filter = filter.reduce<
      (ComponentData.TFilterConfig & ComponentData.TComponentFilterConfig)[]
    >((acc, cur) => {
      const index = templateComponentFilter.findIndex(
        (item) => item.id === cur.id,
      );
      if (!!~index) {
        const [target] = templateComponentFilter.splice(index, 1);
        acc.push({
          ...target,
          ...cur,
        });
      }
      return acc;
    }, []);
  }

  // 条件参数初始化
  initComponentCondition(condition: ComponentData.ComponentCondition[]) {
    type Result = {
      variables: string[];
      action: any;
    };
    return condition.reduce<Result[]>((acc, cur) => {
      const { type, value } = cur;
      const { code, condition } = value;
      const baseMap: Result = {
        variables: [],
        action: this.onCondition.bind(this, cur),
      };
      // 自定义代码条件
      // 有自己的关联参数
      if (type === 'code') {
        const { relation } = code;
        baseMap.variables = relation;
      } else {
        let variables = (condition?.rule || []).reduce<string[]>(
          (acc, item) => {
            item.rule.forEach((item) => {
              if (item.params && !acc.includes(item.params))
                acc.push(item.params);
            });
            return acc;
          },
          [],
        );
        baseMap.variables = variables;
      }
      acc.push(baseMap);
      return acc;
    }, []);
  }

  // 生成关联参数的索引获取
  getParamsOrigin(variable: string) {
    // params
    const paramsIndex = this.prevParams.findIndex(
      // ? variable 可能是id也可能是实际的字段
      (param) => param.id === variable || param.variable === variable,
    );

    // constants
    const constantsIndex = this.constants.findIndex(
      (constant) => constant.key === variable,
    );

    // href
    const hrefParams = VariableStringUtil.getAllUrlParams();
    const hrefIndex = hrefParams[variable];

    // href
    if (hrefIndex !== undefined) {
      return {
        index: {
          type: 'href',
          value: variable,
          getValue: () => {
            const hrefParams = VariableStringUtil.getAllUrlParams();
            return hrefParams[variable];
          },
          getOrigin: () => {
            return variable;
          },
        },
        value: hrefIndex,
      };
    }
    // params
    else if (!!~paramsIndex) {
      const target = this.prevParams[paramsIndex];
      return {
        index: {
          type: 'params',
          value: paramsIndex,
          getValue: (params: ComponentData.TParams[]) => {
            return params[paramsIndex].value;
          },
          getOrigin: (params: ComponentData.TParams[]) => {
            return params[paramsIndex];
          },
        },
        value: target.value,
      };
    }
    // constants
    else if (!!~constantsIndex) {
      const target = this.constants[constantsIndex];
      return {
        index: {
          type: 'constants',
          value: constantsIndex,
          getValue: () => {
            return this.constants[constantsIndex].value;
          },
          getOrigin: () => {
            return this.constants[constantsIndex];
          },
        },
        value: target.value,
      };
    }
    // unknown 暂时取href
    else {
      return {
        index: {
          type: 'href',
          value: variable,
          getValue: () => {
            const hrefParams = VariableStringUtil.getAllUrlParams();
            return hrefParams[variable];
          },
          getOrigin: () => {
            return variable;
          },
        },
        value: hrefIndex,
      };
    }
  }

  // 数据请求url上面的关联参数
  initComponentUrlParamsMap(url: string) {
    const variables = (this.getVariableInString(url, false) as string[]).filter(
      (item) => !item.includes(API_CONTAIN_PARAMS_LAZY_REQUEST_URL_FLAG),
    );

    return {
      action: this.onFetch,
      variables,
    };
  }

  // 参数初始化
  initParamsMap(
    url: string,
    filter: TFilterData[],
    condition: ComponentData.ComponentCondition[],
  ) {
    [
      // 数据请求url上面的关联参数
      // 调接口
      this.initComponentUrlParamsMap(url),
      // 组件的数据过滤器所关联的参数
      // 调过滤器
      ...filter.map((filterItem) => {
        const { params } = filterItem;
        return {
          action: this.onFilter,
          variables: params,
        };
      }),
      // 组件自带的一些关联参数(比如iframe组件)
      // 回调改变的params
      {
        action: this.onParams,
        variables: this.componentParams,
      },
      // 一些条件的关联参数
      // 条件重新计算
      ...this.initComponentCondition(condition),
    ].forEach((item) => {
      const { action, variables } = item;
      variables.forEach((variable) => {
        if (!variable) return;
        if (this.mapParams[variable]) {
          this.mapParams[variable].action.push(action);
        } else {
          this.mapParams[variable] = {
            ...(this.getParamsOrigin(variable) as any),
            action: [action],
          };
        }
      });
    });
  }

  async compare(params: ComponentData.TParams[]) {
    const actionList: any[] = [];
    Object.entries(this.mapParams).forEach((param) => {
      const [variable, value] = param;
      const { action, index, value: prevValue } = value;

      let currentTargetValue: any;
      let currentTarget: any;
      // 当前的值
      try {
        currentTargetValue = index.getValue(params);
        currentTarget = index.getOrigin(params);
      } catch (err) {
        return;
      }

      if (prevValue !== currentTargetValue) {
        this.mapParams[variable].value = currentTargetValue;

        action.forEach((actionData) => {
          if (!actionList.includes(actionData))
            actionList.push(
              actionData.bind(null, currentTarget, currentTargetValue),
            );
        });
      }
    });

    this.prevParams = params;

    return Promise.allSettled(actionList.map((item) => item()));
  }
}

export default filterUtil;
