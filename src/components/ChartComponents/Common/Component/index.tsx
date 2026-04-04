import { get } from 'lodash';
import { Component as ReactComponent } from 'react';
import { mergeWithoutArray } from '@/utils';
import FilterDataUtil from '@/utils/Assist/FilterData';

// ! 这个应该是没有用的
// 公共渲染组件
// 提供对应的一些公共的方法
// 请求的数据放在内部控制

class Component<P extends object = {}, S = {}> extends ReactComponent<
  ComponentData.ComponentProps<P>,
  S
> {
  constructor(props: ComponentData.ComponentProps<P>) {
    super(props);
  }

  // * --------------------数据相关--------------------

  private requestTimer: any = 1;
  private requestLoading: boolean = false;

  // 是否需要定时请求
  private isIntervalRequest = () => {
    const { global, component } = this.props;
    const { screenType } = global;
    const frequency = get(component, 'config.data.request.frequency') || {
      show: false,
    };
    const { show } = frequency;
    return show || screenType !== 'edit';
  };

  // 一开始调用，定时数据请求
  requestDataInterval = (
    params: ComponentData.TParams[],
    constants: ComponentData.TConstants[],
    callback?: (value: any) => void,
  ) => {
    const { component } = this.props;
    clearInterval(this.requestTimer);
    const frequency = get(component, 'config.data.request.frequency.value')!;
    this.requestData(params, constants, callback).then((_) => {
      if (this.isIntervalRequest()) {
        this.requestTimer = setInterval(() => {
          this.requestData(params, constants, callback);
        }, frequency * 1000);
      }
    });
  };

  requestData = async (
    params: ComponentData.TParams[],
    constants: ComponentData.TConstants[],
    callback?: (value: any) => void,
  ) => {
    if (this.requestLoading) return;
    this.requestLoading = true;

    const { component } = this.props;
    const value = get(component, 'config.data')!;
    const result = await FilterDataUtil.requestData(
      component.id,
      value,
      params,
      constants,
    );

    callback?.(result);

    this.requestLoading = false;
  };

  // 获取过滤后的数据
  getValue = (
    value: any,
    params: ComponentData.TParams[],
    constants: ComponentData.TConstants[],
  ) => {
    const { component, global } = this.props;
    const config = get(component, 'config.data');
    // ! const { filter } = global;
    const filter: any[] = [];
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
  };

  // * --------------------数据相关end--------------------

  // * --------------------交互相关--------------------

  // 同步基础事件的数据到全局参数
  syncInteractiveAction = (
    params: ComponentData.TParams[],
    baseInteractiveType: string,
    value: any,
  ) => {
    const { component, global } = this.props;
    const { setParams } = global;
    const baseInteractive: ComponentData.TBaseInteractiveConfig[] = get(
      component,
      'config.interactive.base',
    )!;

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

    const changeParams: {
      prev: ComponentData.TParams;
      now: ComponentData.TParams;
    }[] = [];
    const newParams = params.map((param) => {
      const { id } = param;
      if (!toUpdateParamsId.includes(id)) return param;
      const changeData = {
        ...param,
        value: value[param.key],
      };
      changeParams.push({
        prev: { ...param },
        now: { ...changeData },
      });
      return changeData;
    });

    setParams(newParams, changeParams);
  };

  // * --------------------交互相关-end--------------------

  // * --------------------其他--------------------

  didUpdateBinding = () => {
    // TODO
    // * 1. 全局参数发生变化重新获取数据
  };

  willUnMountBinding = () => {};

  didMountBinding = () => {};

  // * --------------------其他-end--------------------
}

export default Component;
