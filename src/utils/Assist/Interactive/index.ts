import { nanoid } from 'nanoid';

type UpdateParams = Partial<ComponentData.TParams> & {
  variable: string;
};

type AddParams = Partial<ComponentData.TParams> &
  Required<Pick<ComponentData.TParams, 'key' | 'origin' | 'variable'>>;

class InteractiveUtil {
  // 更新交互变量
  updateBaseInteractiveVariable(
    {
      params,
      setParams,
    }: {
      params: ComponentData.TParams[];
      setParams: ComponentData.SetParamsFunction;
    },
    updateData: UpdateParams | AddParams,
  ) {
    const { variable, id } = updateData;

    if (!id && !variable) return '';

    // 相当于是删除了
    if (!variable) {
      const newParams = [...params];
      const index = newParams.findIndex((param) => param.id !== id);
      const target = newParams[index];
      newParams.splice(index, 1);
      setParams(newParams, [
        {
          prev: target,
          now: false,
        },
      ]);
      return '';
    }

    // 新增
    if (!id) {
      const newParam: ComponentData.TParams = {
        show: true,
        ...(updateData as AddParams),
        id: nanoid(),
        originType: 'COMPONENT',
        variable,
      };
      setParams(
        [...params, newParam],
        [
          {
            prev: null,
            now: newParam,
          },
        ],
      );
      return newParam.id;
    }

    // 更新
    const index = params.findIndex((param) => param.id === id);
    const target = params[index];
    const newParams = [...params];
    newParams.splice(index, 1, {
      ...target,
      ...updateData,
    });

    setParams(newParams, [
      {
        prev: target,
        now: newParams[index],
      },
    ]);

    return target.id;
  }

  // 删除组件交互变量
  deleteComponentInteractive(
    {
      params,
      setParams,
    }: {
      params: ComponentData.TParams[];
      setParams: ComponentData.SetParamsFunction;
    },
    origin: string | string[],
  ) {
    const realOrigin = Array.isArray(origin) ? origin : [origin];

    const changeValue: ComponentData.SetParamsChangeValue[] = [];
    const newParams = [...params].filter((item) => {
      const isCorrect = !realOrigin.includes(item.origin as string);
      if (!isCorrect) {
        changeValue.push({
          prev: item,
          now: false,
        });
      }
      return isCorrect;
    });

    setParams(newParams, changeValue);

    return origin;
  }

  // 启用组件交互变量
  enableComponentInteractive(
    {
      params,
      setParams,
    }: {
      params: ComponentData.TParams[];
      setParams: ComponentData.SetParamsFunction;
    },
    origin: string,
    originId: string,
    show: boolean,
  ) {
    const changeParams: ComponentData.SetParamsChangeValue[] = [];
    const newParams = [...params].map((item) => {
      if (item.origin !== origin && item.originId !== originId) return item;
      const changeData = {
        ...item,
        show,
      };
      changeParams.push({
        prev: { ...item },
        now: { ...changeData },
      });
      return changeData;
    });

    setParams(newParams, changeParams);

    return origin;
  }
}

export default new InteractiveUtil();
