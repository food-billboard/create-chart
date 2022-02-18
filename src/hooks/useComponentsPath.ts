import { useMemo } from 'react';

let ID_PATH_MAP: {
  [key: string]: {
    id: string;
    path: string;
    disabled?: boolean;
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
    disabled: boolean,
    deepReduce: (
      list: ComponentData.TComponentData[],
      disabled: boolean,
      path?: string,
      config?: any,
    ) => T[],
    config?: any,
  ) => T,
  config?: any,
) {
  const componentPathMap: typeof ID_PATH_MAP = {};

  const deepReduce = (
    list: ComponentData.TComponentData[],
    disabled: boolean,
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

      const curComponentDisabled = disabled || !!cur.config.attr.lock;

      // id path map
      componentPathMap[cur.id] = {
        id: cur.id,
        path: currentPath,
        disabled: curComponentDisabled,
      };

      if (customReturn) {
        acc.push(
          customReturn(
            { ...cur, path: currentPath } as any,
            nextPath,
            curComponentDisabled,
            deepReduce,
            config,
          ) as any,
        );
      } else {
        acc.push({
          ...cur,
          path: currentPath,
          components: deepReduce(
            components,
            curComponentDisabled,
            nextPath,
            config,
          ),
        } as any);
      }

      return acc;
    }, []);
  };

  const result = deepReduce(components, false, '', config);

  ID_PATH_MAP = {
    ...componentPathMap,
  };

  return result;
}

function format(
  list: ComponentData.TComponentData[],
  callback?: (target: ComponentData.TComponentData) => void,
) {
  return list.reduce<string[]>((acc, cur) => {
    const { id, components = [] } = cur;
    acc.push(id, ...format(components, callback));
    callback?.(cur);
    return acc;
  }, []);
}

export function useComponentChildrenIds(
  components: ComponentData.TComponentData[],
) {
  const childrenIdList = useMemo(() => {
    return format(components);
  }, [components]);

  return childrenIdList;
}

export function useIsComponentChildrenSelect(
  components: ComponentData.TComponentData[],
  select: string[],
) {
  const isSelect = useMemo(() => {
    try {
      format(components, (target) => {
        const { id } = target;
        if (select.includes(id)) {
          throw new Error();
        }
      });
      return false;
    } catch (err) {
      return true;
    }
  }, [components, select]);

  return isSelect;
}
