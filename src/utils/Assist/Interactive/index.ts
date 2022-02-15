import { nanoid } from 'nanoid';

type UpdateParams = Partial<ComponentData.TParams> & {
  variable: string;
};

type AddParams = Partial<ComponentData.TParams> &
  Required<Pick<ComponentData.TParams, 'key' | 'origin' | 'variable'>>;

class InteractiveUtil {
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
}

export default new InteractiveUtil();
