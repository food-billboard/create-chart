import { get, set } from 'lodash';
import ComponentUtil from '../Component';

class DataChangePool {
  setComponentUtil: {
    timeout: any;

    pool: any[];

    pendingPool: any[];

    dealing: boolean;
  } = {
    timeout: null,
    pool: [],
    pendingPool: [],
    dealing: false,
  };

  setComponentDataTimerAction = () => {
    this.setComponentUtil.timeout = setTimeout(() => {
      this.setComponentUtil.dealing = true;

      // this.setComponentUtil.pool.reduce((acc, cur) => {
      //   const [state, action] = cur
      //   acc = this._setComponentData(acc || state, action)
      //   return acc
      // })

      console.log(this.setComponentUtil.pool[0][1], 2222);
      this.setComponentUtil.pool[0][1]({
        type: 'setComponentData',
        payload: {
          value: this.setComponentUtil.pool.map((item) => item[0]),
        },
      });

      const nextPool = this.setComponentUtil.pendingPool.splice(
        0,
        this.setComponentUtil.pendingPool.length,
      );
      this.setComponentUtil.pool = [...nextPool];

      if (nextPool.length) {
        this.setComponentDataTimerAction();
      }

      this.setComponentUtil.dealing = false;
    }, 1000);
  };

  setComponentData = (value: any, put: any) => {
    if (this.setComponentUtil.dealing) {
      this.setComponentUtil.pendingPool.push([value, put]);
      return;
    }

    const pooling = !!this.setComponentUtil.pool.length;
    this.setComponentUtil.pool.push([value, put]);
    if (pooling) return;

    console.log(2222);

    this.setComponentDataTimerAction();
  };

  setComponentDataInternal = (state: any, action: any) => {
    const {
      payload: { value },
    } = action;

    return value.reduce((acc: any, cur: any) => {
      acc = this._setComponentData(acc, cur);
      return acc;
    }, state);
  };

  _setComponentData = (state: any, value: any) => {
    const prevComponents = get(state, 'components');
    const history = get(state, 'history.value');

    const newComponents = ComponentUtil.setComponent(state, {
      payload: value,
    });

    set(state, 'components', newComponents);

    if (!value.enqueue) return state;

    // * history enqueue
    return history.enqueue(state, newComponents, prevComponents);
  };
}

export default new DataChangePool();
