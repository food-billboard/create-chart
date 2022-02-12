import { Component as ReactComponent } from 'react';
import { get } from 'lodash';
import FilterDataUtil from '@/utils/Assist/FilterData';
import { mergeWithoutArray } from '@/utils';

// 公共渲染组件
// 提供对应的一些公共的方法
// 请求的数据放在内部控制

export type TGlobalData = {
  filter: ComponentData.TFilterConfig[];
  params: ComponentData.TParams[];
  screenType: 'edit' | 'preview' | 'production';
};

class Component<P = {}, S = {}> extends ReactComponent<P, S> {
  constructor(
    props: P,
    component: ComponentData.TComponentData,
    global: TGlobalData,
  ) {
    super(props);
    this.component = component;
    this.global = global;
  }

  component: ComponentData.TComponentData;
  global: TGlobalData;

  // * --------------------数据相关--------------------

  private requestTimer: any = 1;
  private requestLoading: boolean = false;

  // 是否需要定时请求
  private isIntervalRequest = () => {
    const { screenType } = this.global;
    const frequency =
      get(this.component, 'config.data.request.frequency') || {};
    const { show } = frequency;
    return show || screenType !== 'edit';
  };

  // 一开始调用，定时数据请求
  requestDataInterval = (callback?: (value: any) => void) => {
    clearInterval(this.requestTimer);
    const frequency = get(
      this.component,
      'config.data.request.frequency.value',
    );
    this.requestData(callback).then((_) => {
      if (this.isIntervalRequest()) {
        this.requestTimer = setInterval(() => {
          this.requestData(callback);
        }, frequency * 1000);
      }
    });
  };

  requestData = async (callback?: (value: any) => void) => {
    if (this.requestLoading) return;
    this.requestLoading = true;

    const value = get(this.component, 'config.data');
    const { params } = this.global;
    const result = await FilterDataUtil.requestData(value, params);

    callback?.(result);

    this.requestLoading = false;
  };

  // 获取过滤后的数据
  getValue = (value: any) => {
    const config = get(this.component, 'config.data');
    const { filter, params } = this.global;
    return FilterDataUtil.getPipeFilterValue(
      mergeWithoutArray({}, config, {
        request: {
          value,
        },
      }),
      filter,
      params,
      false,
    );
  };

  // * --------------------数据相关end--------------------

  // * --------------------交互相关--------------------

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
