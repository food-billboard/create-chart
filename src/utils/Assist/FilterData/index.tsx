import json5 from 'json5';
class FilterData {
  pipeValueByCodeString(value: any, code: string) {
    let filterFunction = new Function('obj', code);
    return filterFunction(value);
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

    const result = existsFilterData.reduce<any>((acc, cur) => {
      const { id } = cur;
      const target = filter.find((item) => item.id === id);
      return this.pipeValueByCodeString(acc, target!.code);
    }, originData);

    try {
      return json5.stringify(result);
    } catch (err) {
      return '{}';
    }
  }
}

export default new FilterData();
