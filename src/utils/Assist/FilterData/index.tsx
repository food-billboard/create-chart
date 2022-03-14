import json5 from 'json5';
import mustache from 'mustache';
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
      } else {
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
      }
    }

    try {
      return format(value);
    } catch (err) {
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
      request: { method, url, headers, body, type, value: responseData },
    } = value;

    if (type !== 'api' || !url) return responseData;

    const realHeaders = this.parseHeaders(headers, params, constants);
    let realBody;

    if (method === 'POST') {
      realBody = this.parseBody(body, params, constants);
    }

    try {
      const result = await request(url, {
        method,
        data: realBody,
        headers: realHeaders as any,
      });
      return result;
    } catch (err) {
      console.error(err);
      return responseData;
    }
  }
}

const filterUtil = new FilterData();

type TFilterData = ComponentData.TFilterConfig &
  ComponentData.TComponentFilterConfig;

// 检查变更并更新
export class CompareFilterUtil {
  constructor(
    {
      componentFilter,
      url,
      onFilter,
      onFetch,
    }: {
      componentFilter: ComponentData.TComponentFilterConfig[];
      url: string;
      onFilter: () => Promise<any>;
      onFetch: () => Promise<any>;
    },
    filter: ComponentData.TFilterConfig[],
    defaultValue: ComponentData.TParams[],
  ) {
    this.prevParams = defaultValue;
    this.onFetch = onFetch;
    this.onFilter = onFilter;
    this.initComponentFilter(filter, componentFilter);
    this.initParamsMap(url, this.filter);
  }

  onFilter;
  onFetch;

  // 组件过滤函数的集合
  filter: TFilterData[] = [];
  mapParams: {
    [variable: string]: {
      action: Function[];
      index: number;
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

  initParamsMap(url: string, filter: TFilterData[]) {
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
    ].forEach((item) => {
      const { action, variables } = item;

      variables.forEach((variable) => {
        if (this.mapParams[variable]) {
          this.mapParams[variable].action.push(action);
        } else {
          const index = this.prevParams.findIndex(
            (param) => param.variable === variable,
          );
          const target = this.prevParams[index];
          if (!!~index) {
            this.mapParams[variable] = {
              index,
              action: [action],
              value: target.value,
            };
          }
        }
      });
    });
  }

  async compare(params: ComponentData.TParams[]) {
    const actionList: any[] = [];

    Object.entries(this.mapParams).forEach((param) => {
      const [variable, value] = param;
      const { action, index, value: prevValue } = value;

      const currentTarget = params[index];

      if (prevValue !== currentTarget.value) {
        this.mapParams[variable].value = currentTarget.value;

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
