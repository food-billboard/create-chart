import { getDvaApp } from 'umi';
import { useIdPathMap } from '@/hooks';
import { getDvaGlobalModelData } from '../Component';

export * from './SaveScreenData';
class DataChangePool {
  multiSetComponentUtil: {
    counter: number;
    total: number;
    pool: any[];
  } = {
    counter: 0,
    total: -1,
    pool: [],
  };

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
  setComponent = (
    value:
      | ComponentMethod.SetComponentMethodParamsData
      | ComponentMethod.SetComponentMethodParamsData[],
    enqueue: boolean = true,
  ) => {
    const app = getDvaApp();
    const dispatch = app._store.dispatch;
    dispatch({ type: 'global/setComponent', value, enqueue });
  };

  // 合并更新组件
  // ? 技术问题，多选拖拽调整大小专用 (⊙_⊙)?
  multiSetComponent = (value: any) => {
    if (!~this.multiSetComponentUtil.total) {
      const state = getDvaGlobalModelData();
      const select: string[] = state?.select || [];

      const idPathMap = useIdPathMap();
      let realSelect: string[] = [];
      select.forEach((item) => {
        const path = idPathMap[item]?.path || '';
        realSelect.push(path.split('.')[0]);
      });
      this.multiSetComponentUtil.total = realSelect.filter(Boolean).length;
    }
    this.multiSetComponentUtil.counter++;
    this.multiSetComponentUtil.pool.push(value);

    if (
      this.multiSetComponentUtil.counter === this.multiSetComponentUtil.total
    ) {
      const app = getDvaApp();
      const dispatch = app._store.dispatch;
      dispatch({
        type: 'global/setComponent',
        value: this.multiSetComponentUtil.pool,
        enqueue: true,
      });
      // init
      this.multiSetComponentUtil = {
        total: -1,
        counter: 0,
        pool: [],
      };
    }
  };
}

export default new DataChangePool();
