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

  formatConstants(constants: ComponentData.TConstants[]) {
    return constants.reduce<{
      [key: string]: string;
    }>((acc, cur) => {
      const { value, key } = cur;
      acc[key] = value || '';
      return acc;
    }, {});
  }

  getAllGlobalParams(
    params: ComponentData.TParams[],
    constants: ComponentData.TConstants[],
  ) {
    return {
      ...this.formatConstants(constants),
      ...this.formatParams(params),
      ...this.#urlParams,
    };
  }

  variableStringToRealString(
    value: string,
    params: ComponentData.TParams[],
    constants: ComponentData.TConstants[],
  ) {
    try {
      return Mustache.render(value, this.getAllGlobalParams(params, constants));
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
