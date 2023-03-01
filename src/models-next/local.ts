import { makeAutoObservable } from 'mobx';

export default class {
  constructor() {
    makeAutoObservable(this);
  }

  componentCollapse = false;
  componentConfigCollapse = false;

  // 组件列表折叠
  // 组件配置折叠
  setLocalConfig = (
    value: Partial<{
      componentCollapse: boolean;
      componentConfigCollapse: boolean;
    }>,
  ) => {
    Object.entries(value).forEach((item: any) => {
      const [key, value] = item;
      const that: any = this;
      that[key] = value;
    });
  };
}
