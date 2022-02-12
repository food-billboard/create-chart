import json5 from 'json5';
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
        params,
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

  // 解析字符串对象变量
  parseVariableStringInObject(value: object, params: ComponentData.TParams[]) {
    return Object.entries(value).reduce<{ [key: string]: string }>(
      (acc, cur) => {
        const [key, value] = cur;
        acc[key] = VariableStringUtil.variableStringToRealString(value, params);
        return acc;
      },
      {},
    );
  }

  // 解析变量body
  parseBody(value: string, params: ComponentData.TParams[]) {
    try {
      const body = json5.parse(value);
      return this.parseVariableStringInObject(body, params);
    } catch {
      return {};
    }
  }

  // 解析变量headers
  parseHeaders(value: string, params: ComponentData.TParams[]) {
    try {
      const headers = json5.parse(value);
      return this.parseVariableStringInObject(headers, params);
    } catch {
      return {};
    }
  }

  async requestData(
    value: ComponentData.TComponentApiDataConfig,
    params: ComponentData.TParams[],
  ) {
    const {
      filter: {},
      request: { method, url, headers, body, type, value: responseData },
    } = value;

    if (type !== 'api' || !url) return responseData;

    const realHeaders = this.parseHeaders(headers, params);
    let realBody;

    if (method === 'POST') {
      realBody = this.parseBody(body, params);
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

export default new FilterData();
