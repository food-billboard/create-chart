import { useMemo, useState, useEffect, useRef } from 'react';
import { useThrottleFn, useDeepCompareEffect } from 'ahooks';
import { useLayerHover } from './useLayerHover';

let ID_PATH_MAP: {
  [key: string]: {
    id: string;
    path: string;
    // 组件是否禁止, 暂时没用
    disabled?: boolean;
    // 组件是否锁定
    lock?: boolean;
    // 组件过滤器数据
    filter?: ComponentData.TComponentApiDataConfig['filter'];
    // 组件的名字
    name: string;
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

      const curComponentDisabled = disabled; // * 这里不需要再去判断lock || !!cur.config.attr.lock;

      // id path map
      componentPathMap[cur.id] = {
        id: cur.id,
        path: currentPath,
        disabled: curComponentDisabled,
        lock: !!cur.config.attr.lock,
        filter: cur.config.data?.filter,
        name: cur.name,
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
  const [, , eventBinder] = useLayerHover();

  const [isSelect, setIsSelect] = useState<{
    click: boolean;
    hover: boolean;
  }>({
    click: false,
    hover: false,
  });

  const isSelectRef = useRef<{
    click: boolean;
    hover: boolean;
  }>({
    click: false,
    hover: false,
  });

  const idList = useRef<string[]>([]);

  const { run } = useThrottleFn(
    () => {
      try {
        idList.current = format(components, (target) => {
          const { id } = target;
          if (select.includes(id)) {
            throw new Error();
          }
        });
        isSelectRef.current = {
          ...isSelectRef.current,
          click: false,
        };
        // setIsSelect(prev => {
        //   return {
        //     ...prev,
        //     click: false
        //   }
        // })
      } catch (err) {
        // setIsSelect(prev => {
        //   return {
        //     ...prev,
        //     click: true
        //   }
        // })
        isSelectRef.current = {
          ...isSelectRef.current,
          click: true,
        };
      } finally {
        setIsSelect(isSelectRef.current);
      }
    },
    {
      wait: 10,
    },
  );

  useDeepCompareEffect(() => {
    run();
  }, [select, components]);

  useEffect(() => {
    return eventBinder((hoverSelect, _, { getter, setter }) => {
      // console.log(hoverSelect, idList.current.length)

      // setIsSelect((isSelect => {
      //   const currentResult = getter()

      //   if(currentResult) return { ...isSelect, hover: false }

      //   const result = !!hoverSelect && idList.current.includes(hoverSelect)

      //   if(result) setter()

      //   return {
      //     ...isSelect,
      //     hover: result
      //   }
      // }))

      const currentResult = getter();
      if (currentResult) {
        isSelectRef.current = { ...isSelectRef.current, hover: false };
      } else {
        const result = !!hoverSelect && idList.current.includes(hoverSelect);
        if (result) setter();
        isSelectRef.current = { ...isSelectRef.current, hover: result };
      }

      setIsSelect(isSelectRef.current);
    });
  }, []);

  return isSelect.click || isSelect.hover;
}
