import { useRef, useCallback, useEffect } from 'react';
import { get } from 'lodash';
import echarts from 'echarts';
import FilterDataUtil from '@/utils/Assist/FilterData';
import { mergeWithoutArray } from '@/utils';
import EventEmitter from './EventEmitter';
import { ComponentProps } from './type';

export function useComponent<P extends object = {}>(props: ComponentProps<P>) {
  const { component, global } = props;

  const requestTimer = useRef<any>(1);
  const requestLoading = useRef<boolean>(false);

  // * --------------------数据相关--------------------

  // 是否需要定时请求
  const isIntervalRequest = useCallback(() => {
    const { screenType } = global;
    const frequency = get(component, 'config.data.request.frequency') || {};
    const { show } = frequency;
    return show || screenType !== 'edit';
  }, [component, global]);

  const requestData = useCallback(
    async (
      params: ComponentData.TParams[],
      constants: ComponentData.TConstants[],
      callback?: (value: any) => void,
    ) => {
      if (requestLoading.current) return;
      requestLoading.current = true;

      const value = get(component, 'config.data');
      const result = await FilterDataUtil.requestData(value, params, constants);

      callback?.(result);

      requestLoading.current = false;
    },
    [component],
  );

  // 一开始调用，定时数据请求
  const requestDataInterval = useCallback(
    (
      params: ComponentData.TParams[],
      constants: ComponentData.TConstants[],
      callback?: (value: any) => void,
    ) => {
      clearInterval(requestTimer.current);
      const frequency = get(component, 'config.data.request.frequency.value');
      requestData(params, constants, callback).then((_) => {
        if (isIntervalRequest()) {
          requestTimer.current = setInterval(() => {
            requestData(params, constants, callback);
          }, frequency * 1000);
        }
      });
    },
    [component, requestData, isIntervalRequest],
  );

  // 获取过滤后的数据
  const getValue = useCallback(
    (
      value: any,
      params: ComponentData.TParams[],
      constants: ComponentData.TConstants[],
    ) => {
      const config = get(component, 'config.data');
      const { filter } = global;
      return FilterDataUtil.getPipeFilterValue(
        mergeWithoutArray({}, config, {
          request: {
            value,
          },
        }),
        filter,
        params,
        constants,
        false,
      );
    },
    [component, global],
  );

  // * --------------------数据相关end--------------------

  // * --------------------交互相关--------------------

  // 同步基础事件的数据到全局参数
  const syncInteractiveAction = useCallback(
    (
      params: ComponentData.TParams[],
      baseInteractiveType: string,
      value: any,
    ) => {
      const { setParams } = global;
      const baseInteractive: ComponentData.TBaseInteractiveConfig[] = get(
        component,
        'config.interactive.base',
      );

      let toUpdateParamsId: string[] = [];

      baseInteractive.some((baseItem) => {
        const { show, fields, type } = baseItem;
        if (baseInteractiveType !== type || !show) return false;

        fields.forEach((field) => {
          const { mapId } = field;
          if (!mapId) return;

          toUpdateParamsId.push(mapId);
        });

        return true;
      });

      setParams(
        params.map((param) => {
          const { id } = param;
          if (!toUpdateParamsId.includes(id)) return param;
          return {
            ...param,
            value: value[param.key],
          };
        }),
      );
    },
    [component, global],
  );

  // * --------------------交互相关-end--------------------

  // * --------------------其他--------------------

  const didUpdateBinding = useCallback(() => {
    // TODO
    // * 1. 全局参数发生变化重新获取数据
  }, []);

  const willUnMountBinding = useCallback(() => {}, []);

  const didMountBinding = useCallback(() => {}, []);

  // * --------------------其他-end--------------------

  return {
    request: requestDataInterval,
    getValue,
    syncInteractiveAction,
  };
}

export function useChartComponent(instance: echarts.ECharts) {
  useEffect(() => {
    instance && EventEmitter.push(instance);
    return () => {
      return EventEmitter.pop(instance);
    };
  }, [instance]);
}
