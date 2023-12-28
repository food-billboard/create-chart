import { message } from '@/components/Message';
import { useIdPathMap } from '@/hooks';
import { MAX_CHART_TO_BE_ADD_IN_PANEL } from '../../constants/screenData';
import { EVENT_NAME_MAP, GLOBAL_EVENT_EMITTER } from '../EventEmitter';
import { getFlatComponents } from './index';

// ? 限制一些对组件的行为操作
class ComponentActionValidator {
  constructor() {
    this.init();
  }

  init() {
    GLOBAL_EVENT_EMITTER.addListener(
      EVENT_NAME_MAP.COMPONENT_ADD_ACTION,
      this.onComponentToBeAdd,
    );
  }

  beforeSetComponent = async (
    value:
      | ComponentMethod.SetComponentMethodParamsData
      | ComponentMethod.SetComponentMethodParamsData[],
    enqueue: boolean = true,
  ) => {
    // 不入history说明是初始化
    if (!enqueue) return;
    const arrValue = Array.isArray(value) ? value : [value];
    for (let i = 0; i < arrValue.length; i++) {
      const current = arrValue[i];
      const actionType = current.originAction || current.action;
      let isValid = true;
      switch (actionType) {
        case 'add':
          isValid = await this.emitComponentToBeAdd(
            current.value as ComponentData.TComponentData,
          );
          break;
        // TODO
        // 其他行为暂时没啥用
        default:
      }
      if (!isValid) return Promise.reject();
    }
  };

  // 组件被添加
  async emitComponentToBeAdd(
    component: ComponentData.TComponentData[] | ComponentData.TComponentData,
  ) {
    const components = Array.isArray(component) ? component : [component];
    const result = await GLOBAL_EVENT_EMITTER.asyncEmit(
      EVENT_NAME_MAP.COMPONENT_ADD_ACTION,
      components,
    );
    return (
      result === null ||
      (Array.isArray(result) && result.every((item) => item !== false))
    );
  }

  onComponentToBeAdd(component: ComponentData.TComponentData[]) {
    const idPathMap = useIdPathMap();
    const currentChartCount = Object.keys(idPathMap).length;
    const isLimit =
      currentChartCount + getFlatComponents(component).length >
      MAX_CHART_TO_BE_ADD_IN_PANEL;
    if (isLimit)
      message.info(`组件添加数量已达"${MAX_CHART_TO_BE_ADD_IN_PANEL}"上限`);
    return !isLimit;
  }

  // 组件被删除
  emitComponentToBeDelete() {}

  onComponentToBeDelete() {}

  // 组件尺寸位置变动
  emitComponentChange() {}

  onComponentChange() {}

  // 组件尺寸变动
  emitComponentResize() {}

  // 组件位置变动
  emitComponentDrag() {}
}

export default new ComponentActionValidator();
