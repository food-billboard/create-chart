import {
  useRef,
  useCallback,
  useEffect,
  useState,
  useMemo,
  RefObject,
} from 'react';
import { get, isEqual, noop } from 'lodash';
import { useUpdateEffect } from 'ahooks';
import FilterDataUtil from '@/utils/Assist/FilterData';
import VariableStringUtil from '@/utils/Assist/VariableString';
import { mergeWithoutArray } from '@/utils';
import { TFetchFragmentRef } from '@/components/ChartComponents/Common/FetchFragment';
import { useFilterChange } from './useFilterChange';
import { useLinkageInteractive } from './useLinkageInteractive';

export function useComponent<P extends object = {}>(
  props: ComponentData.ComponentProps<P>,
  requestRef: RefObject<TFetchFragmentRef>,
) {
  const { component, global } = props;
  const { screenType } = global;
  const { id } = component;

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

  // 组件的过滤配置
  const componentLinkageConfig = useMemo(() => {
    return get(component, 'config.interactive.linkage');
  }, [component]);

  const linkageMethod = useLinkageInteractive(componentLinkageConfig);

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

  // 之前请求的value
  const previouseRequestDataValue = useRef<any>(requestDataValue);

  // 数据请求的地址
  const requestUrl = useMemo(() => {
    return get(requestDataConfig, 'request.url');
  }, [requestDataConfig]);

  // 是否需要定时请求
  const isIntervalRequest = useCallback(() => {
    const { show } = requestFrequencyConfig;
    return show && screenType !== 'edit';
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

      try {
        const result = await FilterDataUtil.requestData(
          requestDataConfig,
          params,
          constants,
        );

        callback?.(result);
        setRequestResult(result);
      } catch (err) {}

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
      config?: SuperPartial<ComponentData.TComponentApiDataConfig>,
    ) => {
      const result = FilterDataUtil.getPipeFilterValue(
        mergeWithoutArray({}, requestDataConfig, config, {
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

  // 条件判断
  const getConditionResult: (
    params: ComponentData.TParams[],
    constants: ComponentData.TConstants[],
    condition: ComponentData.ComponentCondition,
  ) => ComponentData.ComponentConditionActionType | false = useCallback(
    (globalParams, constants, condition) => {
      if (screenType === 'edit') return false;
      const { type, action, value } = condition;
      const { code, condition: valueCondition } = value;
      let result: boolean = false;
      if (type === 'code') {
        const { code: dealCode } = code;
        // 代码执行
        let conditionFunction = new Function('data', dealCode);
        try {
          result = conditionFunction(
            VariableStringUtil.getAllGlobalParams(globalParams, constants),
          );
        } catch (err) {
          console.error(err);
          result = false;
        }
      } else {
        const { type, rule } = valueCondition;
        const method = type === 'and' ? 'every' : 'some';
        result = rule[method]((item) => {
          const { rule, type } = item;
          const method = type === 'and' ? 'every' : 'some';
          return rule[method]((item) => {
            const { params, value, condition } = item;
            if (!params) return false;
            const allParams = VariableStringUtil.getAllGlobalParams4Array(
              globalParams,
              constants,
            );
            const target = allParams.find((item) => item.id === params);
            if (!target) return false;

            switch (condition) {
              case 'equal':
                return target.value == value;
              case 'not-equal':
                return target.value != value;
              case 'great-then':
                return target.value! > value;
              case 'include':
                return target.value?.includes(value);
              case 'less-then':
                return target.value! < value;
              case 'not-great-then':
                return target.value! <= value;
              case 'not-less-then':
                return target.value! >= value;
            }

            return false;
          });
        });
      }

      return result ? action : false;
    },
    [screenType],
  );

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
      let updateValueKeys = Object.keys(value);

      baseInteractive.some((baseItem) => {
        const { show, fields, type } = baseItem;
        if (baseInteractiveType !== type || !show) return false;

        fields.forEach((field) => {
          const { mapId, key } = field;
          if (!mapId || !updateValueKeys.includes(key)) return;
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
    (
      value?: any,
      options?: Partial<TFetchFragmentRef> & {
        config?: SuperPartial<ComponentData.TComponentApiDataConfig>;
      },
    ) => {
      const {
        params = [],
        constants = [],
        filter = [],
      } = requestRef.current || {};
      if (value) {
        setRequestResult(value);
      }
      return getValue(
        value,
        options?.params || params,
        options?.constants || constants,
        options?.filter || filter,
        options?.config,
      );
    },
    [getValue],
  );

  // 外部调用的同步全部参数
  const outerSyncInteractiveAction = useCallback(
    (baseInteractiveType: string, value: any) => {
      const { params = [] } = requestRef.current || {};
      return syncInteractiveAction(params, baseInteractiveType, value);
    },
    [syncInteractiveAction, baseInteractive],
  );

  // 外部调用条件判断
  const outerGetConditionResult = useCallback(
    (condition: ComponentData.ComponentCondition) => {
      const { params = [], constants = [] } = requestRef.current || {};
      return getConditionResult(params, constants, condition);
    },
    [getConditionResult],
  );

  // * --------------------其他--------------------

  // 绑定组件过滤器的变化
  useFilterChange(id, outerGetValue);

  // 取消定时器
  useEffect(() => {
    return () => {
      clearInterval(requestTimer.current);
    };
  }, []);

  useUpdateEffect(() => {
    if (!isEqual(requestDataValue, previouseRequestDataValue.current)) {
      previouseRequestDataValue.current = requestDataValue;
      outerGetValue(requestDataValue);
    } else if (!isEqual(requestResult, requestDataValue)) {
      outerGetValue(requestResult);
    }
  }, [outerGetValue, requestResult, requestDataValue]);

  // * --------------------其他-end--------------------

  return {
    request: outerRequest,
    getValue: outerGetValue,
    onCondition: outerGetConditionResult,
    syncInteractiveAction: outerSyncInteractiveAction,
    linkageMethod: screenType === 'edit' ? noop : linkageMethod,
    requestUrl,
    componentFilter,
    componentFilterMap,
    value: processedValue,
  };
}
