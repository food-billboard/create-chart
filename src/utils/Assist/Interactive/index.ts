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
      setParams: (params: ComponentData.TParams[]) => void;
    },
    updateData: UpdateParams | AddParams,
  ) {
    const { variable, id } = updateData;

    if (!id && !variable) return '';

    if (!variable) {
      const newParams = params.filter((param) => param.id !== id);
      setParams(newParams);
      return '';
    }

    if (!id) {
      const newParam: ComponentData.TParams = {
        show: true,
        ...(updateData as AddParams),
        id: nanoid(),
        originType: 'COMPONENT',
        variable,
      };
      setParams([...params, newParam]);
      return newParam.id;
    }

    const index = params.findIndex((param) => param.id === id);
    const target = params[index];
    const newParams = [...params];
    newParams.splice(index, 1, {
      ...target,
      ...updateData,
    });

    setParams(newParams);

    return target.id;
  }

  // 删除组件交互变量
  deleteComponentInteractive(
    {
      params,
      setParams,
    }: {
      params: ComponentData.TParams[];
      setParams: (params: ComponentData.TParams[]) => void;
    },
    origin: string | string[],
  ) {
    const realOrigin = Array.isArray(origin) ? origin : [origin];

    const newParams = [...params].filter(
      (item) => !realOrigin.includes(item.origin as string),
    );

    setParams(newParams);

    return origin;
  }

  // 启用组件交互变量
  enableComponentInteractive(
    {
      params,
      setParams,
    }: {
      params: ComponentData.TParams[];
      setParams: (params: ComponentData.TParams[]) => void;
    },
    origin: string,
    originId: string,
    show: boolean,
  ) {
    const newParams = [...params].map((item) => {
      if (item.origin !== origin && item.originId !== originId) return item;
      return {
        ...item,
        show,
      };
    });

    setParams(newParams);

    return origin;
  }
}

export default new InteractiveUtil();
