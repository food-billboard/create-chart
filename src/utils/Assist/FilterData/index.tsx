import json5 from 'json5';
import request from '../../request';

class FilterData {
  pipeValueByCodeString(value: any, code: string) {
    let filterFunction = new Function('data', code);
    try {
      return {
        value: filterFunction(value),
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
  ) {
    const {
      filter: { value: filterData },
      request: { value: originData },
    } = value;

    const unDisabledFilterData = filterData.filter((item) => !item.disabled);
    const existsFilterData = unDisabledFilterData.filter((item) =>
      filter.some((filterData) => filterData.id === item.id),
    );

    let result: any = originData;
    existsFilterData.some((cur) => {
      const { id } = cur;
      const target = filter.find((item) => item.id === id);
      const { error, value } = this.pipeValueByCodeString(result, target!.code);
      result = value;
      return error;
    });

    try {
      return JSON.stringify(result);
    } catch (err) {
      return '{}';
    }
  }

  async requestData(value: ComponentData.TComponentApiDataConfig) {
    const {
      filter: {},
      request: { method, url, headers, body, type, value: responseData },
    } = value;

    if (type !== 'api' || !url) return responseData;

    let realHeaders;
    let realBody;

    if (method === 'POST') {
      try {
        realBody = json5.parse(body);
      } catch {
        realBody = {};
      }
    }

    try {
      realHeaders = json5.parse(headers);
    } catch {
      realHeaders = {};
    }

    try {
      const result = await request(url, {
        method,
        data: realBody,
        headers: realHeaders,
      });
      return result;
    } catch (err) {
      console.error(err);
      return responseData;
    }
  }
}

export default new FilterData();
