import Mustache from 'mustache';
import { getPageQuery } from '../../tool';

class VariableStringUtil {
  constructor() {
    this.getAllUrlParams();
  }

  #urlParams = {};

  variableStringToRealString(
    value: string,
    dataSource: ComponentData.TParams[],
  ) {
    const dataSourceMap = dataSource.reduce<{
      [key: string]: string;
    }>((acc, cur) => {
      const { value, variable } = cur;
      acc[variable] = value;
      return acc;
    }, {});

    try {
      return Mustache.render(value, {
        ...dataSourceMap,
        ...this.#urlParams,
      });
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
