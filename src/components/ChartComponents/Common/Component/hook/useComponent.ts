import {
  useRef,
  useCallback,
  useEffect,
  useState,
  useMemo,
  RefObject,
} from 'react';
import { get, isEqual } from 'lodash';
import { useUpdateEffect } from 'ahooks';
import FilterDataUtil from '@/utils/Assist/FilterData';
import { mergeWithoutArray } from '@/utils';
import { TFetchFragmentRef } from '@/components/ChartComponents/Common/FetchFragment';
import { ComponentProps } from '../type';

export function useComponent<P extends object = {}>(
  props: ComponentProps<P>,
  requestRef: RefObject<TFetchFragmentRef>,
) {
  const { component, global } = props;
  const { screenType } = global;

  // 未处理的数据格式
  const [requestResult, setRequestResult] = useState<any>(() => {
    return component.config.data?.request.value;
  });
  // 经过过滤的数据格式
  const [processedValue, setProcessedValue] = useState<any>(() => {
    return component.config.data?.request.value;
  });

  const requestTimer = useRef<any>(1);
  const requestLoading = useRef<boolean>(false);

  // * --------------------数据相关--------------------

  // 组件的过滤配置
  const componentFilterConfig = useMemo(() => {
    return get(component, 'config.data.filter');
  }, [component]);

  // 组件过滤函数集合
  const componentFilter = useMemo(() => {
    return componentFilterConfig?.value;
  }, [componentFilterConfig]);

  // 组件过滤的字段映射
  const componentFilterMap = useMemo(() => {
    return componentFilterConfig?.map;
  }, [componentFilterConfig]);

  // 调用频率配置
  const requestFrequencyConfig = useMemo(() => {
    return get(component, 'config.data.request.frequency') || {};
  }, [component]);

  // 调用频率
  const requestFrequency = useMemo(() => {
    return requestFrequencyConfig.value;
  }, [requestFrequencyConfig]);

  // 数据请求配置
  const requestDataConfig = useMemo(() => {
    return get(component, 'config.data');
  }, [component]);

  // 请求的value
  const requestDataValue = useMemo(() => {
    return get(requestDataConfig, 'request.value');
  }, [requestDataConfig]);

  // 数据请求的地址
  const requestUrl = useMemo(() => {
    return get(requestDataConfig, 'request.url');
  }, [requestDataConfig]);

  // 是否需要定时请求
  const isIntervalRequest = useCallback(() => {
    const { show } = requestFrequencyConfig;
    return show || screenType !== 'edit';
  }, [requestFrequencyConfig, screenType]);

  const baseInteractive: ComponentData.TBaseInteractiveConfig[] =
    useMemo(() => {
      return get(component, 'config.interactive.base');
    }, [component]);

  // 数据请求
  const requestData = useCallback(
    async (
      params: ComponentData.TParams[],
      constants: ComponentData.TConstants[],
      callback?: (value: any) => void,
    ) => {
      if (requestLoading.current) return;
      requestLoading.current = true;

      const result = await FilterDataUtil.requestData(
        requestDataConfig,
        params,
        constants,
      );

      callback?.(result);
      setRequestResult(result);

      requestLoading.current = false;
    },
    [requestDataConfig],
  );

  // 一开始调用，定时数据请求
  const requestDataInterval = useCallback(
    (
      params: ComponentData.TParams[],
      constants: ComponentData.TConstants[],
      callback?: (value: any) => void,
    ) => {
      clearInterval(requestTimer.current);

      requestData(params, constants, callback).then((_) => {
        if (isIntervalRequest()) {
          requestTimer.current = setInterval(() => {
            requestData(params, constants, callback);
          }, requestFrequency * 1000);
        }
      });
    },
    [requestFrequency, requestData, isIntervalRequest],
  );

  // 获取过滤后的数据
  const getValue = useCallback(
    (
      value: any,
      params: ComponentData.TParams[],
      constants: ComponentData.TConstants[],
      filter: ComponentData.TFilterConfig[],
    ) => {
      const result = FilterDataUtil.getPipeFilterValue(
        mergeWithoutArray({}, requestDataConfig, {
          request: {
            value,
          },
        }),
        filter,
        params,
        constants,
        false,
      );
      setProcessedValue(result);
      return result;
    },
    [requestDataConfig],
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
      if (screenType === 'edit') return;
      const { setParams } = global;

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
    [component, global, screenType, baseInteractive],
  );

  // * --------------------交互相关-end--------------------

  // 外部调用的request
  const outerRequest = useCallback(
    async (callback?: (value: any) => void) => {
      const { params = [], constants = [] } = requestRef.current || {};
      return requestDataInterval(params, constants, callback);
    },
    [requestDataInterval],
  );

  // 外部调用的getValue
  const outerGetValue = useCallback(
    (value?: any) => {
      const {
        params = [],
        constants = [],
        filter = [],
      } = requestRef.current || {};
      if (value) {
        setRequestResult(value);
      }
      return getValue(value, params, constants, filter);
    },
    [getValue, requestResult],
  );

  // 外部调用的同步全部参数
  const outerSyncInteractiveAction = useCallback(
    (baseInteractiveType: string, value: any) => {
      const { params = [] } = requestRef.current || {};
      return syncInteractiveAction(params, baseInteractiveType, value);
    },
    [syncInteractiveAction, baseInteractive],
  );

  // * --------------------其他--------------------

  // 取消定时器
  useEffect(() => {
    return () => {
      clearInterval(requestTimer.current);
    };
  }, []);

  useUpdateEffect(() => {
    if (!isEqual(requestResult, requestDataValue)) {
      outerGetValue(requestDataValue);
    }
  }, [outerGetValue, requestResult, requestDataValue]);

  // * --------------------其他-end--------------------

  return {
    request: outerRequest,
    getValue: outerGetValue,
    syncInteractiveAction: outerSyncInteractiveAction,
    requestUrl,
    componentFilter,
    componentFilterMap,
    value: processedValue,
  };
}
