import Mustache from 'mustache';
import { getPageQuery } from '../../tool';

class VariableStringUtil {
  constructor() {
    this.getAllUrlParams();
  }

  #urlParams = {};

  formatParams(params: ComponentData.TParams[]) {
    return params.reduce<{
      [key: string]: string;
    }>((acc, cur) => {
      const { value, variable } = cur;
      acc[variable] = value || '';
      return acc;
    }, {});
  }

  getAllGlobalParams(params: ComponentData.TParams[]) {
    return {
      ...this.formatParams(params),
      ...this.#urlParams,
    };
  }

  variableStringToRealString(
    value: string,
    dataSource: ComponentData.TParams[],
  ) {
    try {
      return Mustache.render(value, this.getAllGlobalParams(dataSource));
    } catch (err) {
      return value;
    }
  }

  get urlParams() {
    return this.#urlParams;
  }

  getAllUrlParams() {
    const result = getPageQuery();
    this.#urlParams = result;
    return result;
  }
}

export default new VariableStringUtil();
