import json5 from 'json5';
import mustache from 'mustache';
import { preRequestData } from '@/services';
import VariableStringUtil from '../VariableString';
import request from '../../request';

class FilterData {
  stringDataToObject(value: string, defaultValue = '{}') {
    try {
      return json5.parse(value);
    } catch (err) {
      return defaultValue;
    }
  }

  pipeValueByCodeString(value: any, global: any, code: string) {
    let filterFunction = new Function('data', 'global', code);
    try {
      return {
        value: filterFunction(value, global),
        error: false,
      };
    } catch (err) {
      console.error(err);
      return {
        value,
        error: true,
      };
    }
  }

  // 过滤器执行
  getPipeFilterValue(
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
    existsFilterData.some((cur) => {
      const { id } = cur;
      const target = filter.find((item) => item.id === id);
      const { error, value } = this.pipeValueByCodeString(
        result,
        VariableStringUtil.getAllGlobalParams(params, constants),
        target!.code,
      );
      result = value;
      return error;
    });

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
        acc[key] = VariableStringUtil.variableStringToRealString(
          value,
          params,
          constants,
        );
        return acc;
      },
      {},
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

  async requestData(
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
        value: responseData,
        serviceRequest,
      },
    } = value;

    if (type !== 'api' || !url) return responseData;

    const realHeaders = this.parseHeaders(headers, params, constants);
    let realBody;

    if (method === 'POST') {
      realBody = this.parseBody(body, params, constants);
    }

    try {
      let result: any;

      // 服务端代理请求
      if (serviceRequest) {
        result = await preRequestData({
          method: method.toLowerCase() as any,
          body: JSON.stringify(realBody) || '{}',
          header: JSON.stringify(realHeaders) || '{}',
          url,
        });
      } else {
        result = await request(url, {
          method,
          data: realBody,
          headers: realHeaders as any,
          mis: false,
        });
      }
      return result;
    } catch (err) {
      console.error('-----------error generate start-----------');
      console.error(`request error for: ${url}`);
      console.error(err);
      console.error('-----------error generate end-----------');
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
      url,
      onFilter,
      onFetch,
      onCondition,
      onHashChange,
    }: {
      componentFilter: ComponentData.TComponentFilterConfig[];
      componentCondition: ComponentData.ComponentCondition[];
      componentConstants: ComponentData.TConstants[];
      url: string;
      id: string;
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
    this.onFetch = onFetch;
    this.onFilter = onFilter;
    this.onCondition = onCondition;
    this.initComponentFilter(filter, componentFilter);
    this.initParamsMap(url, this.filter, this.condition);
    // hash 值改变监听
    hashChangeListenerBindFunc(id, onHashChange);
  }

  onFilter;
  onFetch;
  onCondition;

  // 组件过滤函数的集合
  filter: TFilterData[] = [];
  condition;
  constants;
  mapParams: {
    [variable: string]: {
      action: Function[];
      index: {
        type: 'params' | 'constants' | 'href';
        value: any;
        getValue: (params?: ComponentData.TParams[]) => any;
      };
      value?: string;
    };
  } = {};
  prevParams: ComponentData.TParams[] = [];

  getVariableInString(value: string) {
    try {
      // * 暂时只支持变量，不支持条件和循环
      return mustache
        .parse(value)
        .filter((item) => item[0] === 'name')
        .map((item) => item[1]);
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
    return condition.reduce<
      {
        variables: string[];
        action: any;
      }[]
    >((acc, cur) => {
      const { type, value } = cur;
      const { code, condition } = value;
      if (type === 'code') {
        const { relation } = code;
        acc.push({
          variables: relation,
          action: this.onCondition.bind(this, cur),
        });
      } else {
        let variables = condition.rule.reduce<string[]>((acc, item) => {
          item.rule.forEach((item) => {
            if (!acc.includes(item.params)) acc.push(item.params);
          });
          return acc;
        }, []);
        acc.push({
          variables,
          action: this.onCondition.bind(this, cur),
        });
      }
      return acc;
    }, []);
  }

  // 生成关联参数的索引获取
  getParamsOrigin(variable: string) {
    // params
    const paramsIndex = this.prevParams.findIndex(
      (param) => param.id === variable,
    );

    // constants
    const constantsIndex = this.constants.findIndex(
      (constant) => constant.id === variable,
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
        },
        value: hrefIndex,
      };
    }
  }

  // 参数初始化
  initParamsMap(
    url: string,
    filter: TFilterData[],
    condition: ComponentData.ComponentCondition[],
  ) {
    [
      {
        action: this.onFetch,
        variables: this.getVariableInString(url),
      },
      ...filter.map((filterItem) => {
        const { params } = filterItem;
        return {
          action: this.onFilter,
          variables: params,
        };
      }),
      ...this.initComponentCondition(condition),
    ].forEach((item) => {
      const { action, variables } = item;
      variables.forEach((variable) => {
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

      // 当前的值
      const currentTargetValue = index.getValue(params);

      if (prevValue !== currentTargetValue) {
        this.mapParams[variable].value = currentTargetValue;

        action.forEach((actionData) => {
          if (!actionList.includes(actionData)) actionList.push(actionData);
        });
      }
    });

    this.prevParams = params;

    return Promise.allSettled(actionList.map((item) => item()));
  }
}

export default filterUtil;
