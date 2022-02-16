let ID_PATH_MAP: {
  [key: string]: {
    id: string;
    path: string;
  };
} = {};

export function useIdPathMap(
  force: boolean = false,
  components: ComponentData.TComponentData[] = [],
) {
  if (force && !Object.keys(ID_PATH_MAP).length) {
    useComponentPath(components);
  }
  return ID_PATH_MAP;
}

export function useComponentPath<T = ComponentData.TComponentDateWithPath>(
  components: ComponentData.TComponentData[],
  customReturn?: (
    entry: ComponentData.TComponentDateWithPath,
    nextPath: string,
    deepReduce: (
      list: ComponentData.TComponentData[],
      path?: string,
      config?: any,
    ) => T[],
    config?: any,
  ) => T,
  config?: any,
) {
  const componentPathMap: {
    [key: string]: {
      id: string;
      path: string;
    };
  } = {};

  const deepReduce = (
    list: ComponentData.TComponentData[],
    path?: string,
    config?: any,
  ) => {
    return list.reduce<T[]>((acc, cur, index) => {
      const { components } = cur;

      const nextPath = path
        ? `${path}.${index.toString()}.components`
        : `${index.toString()}.components`;
      const currentPath = path
        ? `${path}.${index.toString()}`
        : index.toString();

      // id path map
      componentPathMap[cur.id] = {
        id: cur.id,
        path: currentPath,
      };

      if (customReturn) {
        acc.push(
          customReturn(
            { ...cur, path: currentPath } as any,
            nextPath,
            deepReduce,
            config,
          ) as any,
        );
      } else {
        acc.push({
          ...cur,
          path: currentPath,
          components: deepReduce(components, nextPath, config),
        } as any);
      }

      return acc;
    }, []);
  };

  const result = deepReduce(components, '', config);

  ID_PATH_MAP = {
    ...componentPathMap,
  };

  return result;
}
