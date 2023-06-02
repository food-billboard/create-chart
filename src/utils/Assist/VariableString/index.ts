import Mustache from 'mustache';
import { getPageQuery } from '../../tool';

class VariableStringUtil {
  constructor() {
    this.getAllUrlParams();
  }

  #urlParams = {};
  #urlParams4Array: ComponentData.TConstants[] = [];

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
      if (!key) return acc;
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

  getAllGlobalParams4Array(
    params: ComponentData.TParams[],
    constants: ComponentData.TConstants[],
  ) {
    return [
      ...constants,
      ...params.reduce<any>((acc, item) => {
        if (!item.show) return acc;
        acc.push({
          key: item.variable,
          value: item.value,
          id: item.id,
        });
        return acc;
      }, []),
      ...this.urlParams4Array,
    ];
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

  get urlParams4Array() {
    return this.#urlParams4Array;
  }

  object2Array(value: object) {
    return Object.entries(value).reduce<ComponentData.TConstants[]>(
      (acc, cur) => {
        const [key, value] = cur;
        acc.push({
          key,
          value,
          id: key,
          description: `来源于url地址:${key}`,
        });
        return acc;
      },
      [],
    );
  }

  getAllUrlParams() {
    const result = getPageQuery();
    this.#urlParams = result;
    this.#urlParams4Array = this.object2Array(result);
    return result;
  }
}

export default new VariableStringUtil();
