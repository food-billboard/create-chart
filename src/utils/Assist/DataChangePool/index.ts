import { get, set } from 'lodash';
import { getDvaApp } from 'umi';
import ComponentUtil from '../Component';

class DataChangePool {
  // * 集合更新暂时没用到，以后可能会用

  // setComponentUtil: {
  //   timeout: any;

  //   pool: any[];

  //   pendingPool: any[];

  //   dealing: boolean;
  // } = {
  //   timeout: null,
  //   pool: [],
  //   pendingPool: [],
  //   dealing: false,
  // };

  // setComponentDataTimerAction = () => {
  //   this.setComponentUtil.timeout = setTimeout(() => {
  //     this.setComponentUtil.dealing = true;

  //     // 触发集体更新
  //     this._setComponent(this.setComponentUtil.pool)

  //     const nextPool = this.setComponentUtil.pendingPool.splice(
  //       0,
  //       this.setComponentUtil.pendingPool.length,
  //     );
  //     this.setComponentUtil.pool = [...nextPool];

  //     if (nextPool.length) {
  //       this.setComponentDataTimerAction();
  //     }

  //     this.setComponentUtil.dealing = false;
  //   }, 100);
  // }

  // _setComponent = (value: ComponentMethod.SetComponentMethodParamsData[] | ComponentMethod.SetComponentMethodParamsData, enqueue: boolean=true) => {
  //   if (this.setComponentUtil.dealing) {
  //     this.setComponentUtil.pendingPool.push({ value, enqueue });
  //     return;
  //   }

  //   const pooling = !!this.setComponentUtil.pool.length;
  //   this.setComponentUtil.pool.push({ value, enqueue });
  //   if (pooling) return;

  //   this.setComponentDataTimerAction();
  // }

  // 更新组件数据
  setComponent = (value: any, enqueue: boolean = true) => {
    const app = getDvaApp();
    const dispatch = app._store.dispatch;
    dispatch({ type: 'global/setComponent', value: [{ value, enqueue }] });
  };
}

export default new DataChangePool();
