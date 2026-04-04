import { useDeepCompareEffect, useUpdateEffect } from 'ahooks';
import { noop } from 'lodash';
import { useEffect, useRef } from 'react';
import { connect } from 'umi';
import {
  EVENT_NAME_MAP,
  GLOBAL_EVENT_EMITTER,
} from '@/utils/Assist/EventEmitter';
import { CompareFilterUtil } from '@/utils/Assist/FilterData';
import { mapDispatchToProps, mapStateToProps } from './connect';

export type TFetchFragmentProps = {
  id: string;
  params: ComponentData.TParams[];
  filter: ComponentData.TFilterConfig[];
  constants: ComponentData.TConstants[];
  screenType: ComponentData.ScreenType;
  url: string;
  componentFilter: ComponentData.TComponentFilterConfig[];
  componentCondition?: ComponentData.ComponentConditionConfig;
  componentParams?: string[];

  reParams?: (targetParams: ComponentData.TParams, newValue: any) => void;
  reFetchData: () => Promise<any>;
  reGetValue: () => void;
  reCondition?: (
    condition: ComponentData.ComponentCondition,
    initialState: ComponentData.ComponentConditionConfig['initialState'],
  ) => void;
};

export type TFetchFragmentRef = {
  params: ComponentData.TParams[];
  constants: ComponentData.TConstants[];
  filter: ComponentData.TFilterConfig[];
};

const FetchFragment = (props: TFetchFragmentProps) => {
  const {
    params,
    filter,
    constants,
    componentFilter,
    componentParams = [],
    componentCondition: componentConditionConfig = {
      value: [],
      initialState: 'visible',
    },
    url,
    reParams = noop,
    reFetchData,
    reGetValue,
    reCondition = noop,
    id,
  } = props;

  const { value: componentCondition = [], initialState } =
    componentConditionConfig;

  // 检查数据过滤的方法
  const filterUtil = useRef<CompareFilterUtil>(
    new CompareFilterUtil(
      {
        url,
        id,
        componentFilter,
        componentCondition,
        componentConstants: constants,
        componentParams,
        onParams: reParams,
        onFetch: async () => {
          return reFetchData();
        },
        onFilter: async () => {
          return reGetValue();
        },
        onCondition: (condition) => {
          return reCondition(condition, initialState);
        },
        onHashChange: () => {
          // * 可能存在hash值手动更改的情况
          filterUtil.current?.compare(params);
        },
      },
      filter,
      params,
    ),
  );

  // 数据发生改变的时候比较数据
  useUpdateEffect(() => {
    filterUtil.current?.compare(params);
  }, [params]);

  useDeepCompareEffect(() => {
    componentCondition.forEach((condition) => {
      reCondition(condition, initialState);
    });

    function listener(
      params: ComponentData.TParams[],
      changeParams: ComponentData.SetParamsChangeValue[],
      changeParamsIds: string[],
    ) {
      componentCondition.forEach((condition) => {
        const {
          action,
          type,
          value: { code, condition: valueCondition },
        } = condition;
        let valid = false;
        // 小窗显示的需要单独处理
        // 判断更改的params中是否包含此组件的关联参数
        // ? 因为对于弹窗的显示隐藏，要的是多次对于同一条件的多次触发，但是可能存在参数的值并没有发生改变，比如说是点击事件的响应，他的值并不会改变，但是却希望小窗显示始终响应此种改变，所以在此做特殊处理
        // TODO
        // ? 对于前面有的关于渐隐渐显条件，看后续是否也需要同样支持
        if (['modal-visible'].includes(action)) {
          if (type === 'code') {
            valid = code.relation.some((item) =>
              changeParamsIds.includes(item),
            );
          } else {
            valid = valueCondition.rule.some((item) => {
              return item.rule.some((item) =>
                changeParamsIds.includes(item.params),
              );
            });
          }
          if (valid) {
            reCondition(condition, initialState);
          }
        }
      });
    }
    GLOBAL_EVENT_EMITTER.addListener(EVENT_NAME_MAP.PARAMS_CHANGE, listener);
    return () => {
      GLOBAL_EVENT_EMITTER.removeListener(
        EVENT_NAME_MAP.PARAMS_CHANGE,
        listener,
      );
    };
  }, [componentCondition, reCondition, initialState]);

  useEffect(() => {
    reFetchData().then(reGetValue);
  }, []);

  return <></>;
};

export default connect(mapStateToProps, mapDispatchToProps)(FetchFragment);
