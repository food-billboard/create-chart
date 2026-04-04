import { get } from 'lodash';
import { useAnyDva } from '@/hooks';
import InteractiveUtil from '@/utils/Assist/Interactive';
import { GLOBAL_EVENT_EMITTER, EVENT_NAME_MAP } from '../index';

// 组件被删除
// 自动删除相关关联属性
function onComponentDelete(deleteComponent: string[]) {
  const { dispatch, getState } = useAnyDva();

  const state = getState().global;
  const params = get(state, 'screenData.config.attr.params');

  InteractiveUtil.deleteComponentInteractive(
    {
      params,
      setParams: (params, changeValue) => {
        dispatch({
          type: 'global/setParams',
          value: params,
          changeValue,
        });
      },
    },
    deleteComponent,
  );
}

// 一些预设的事件订阅
export function presetRegisterEvent() {
  GLOBAL_EVENT_EMITTER.addListener(
    EVENT_NAME_MAP.COMPONENT_DELETE_ACTION,
    onComponentDelete,
  );
}

export function presetUnRegisterEvent() {
  GLOBAL_EVENT_EMITTER.removeListener(
    EVENT_NAME_MAP.COMPONENT_DELETE_ACTION,
    onComponentDelete,
  );
}
