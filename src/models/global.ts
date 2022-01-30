import { set, get, merge } from 'lodash';
import arrayMove from 'array-move';
import { DEFAULT_SCREEN_DATA, ThemeMap } from '@/utils/constants';
import { mergeWithoutArray } from '@/utils/tool';
import { HistoryUtil } from '@/utils/Assist/History';
import ComponentUtil from '@/utils/Assist/Component';
import { DragData } from './connect';

export default {
  namespace: 'global',

  state: {
    // 大屏
    screenData: DEFAULT_SCREEN_DATA,
    components: DEFAULT_SCREEN_DATA.components,
    guideLine: {
      show: true,
      value: [],
    },
    select: [],
    history: {
      value: new HistoryUtil(),
      isUndoDisabled: true,
      isRedoDisabled: true,
    },
    componentSelect: null,
    theme: ThemeMap.dark,
    clipboard: [],
    drag: {
      value: null,
    },
    scale: 100,
  },

  effects: {
    *setScreen({ value }: { value: string }, { put }: any) {
      yield put({
        type: 'setData',
        payload: value,
      });
    },

    *setGuideLine({ value }: { value: string }, { put }: any) {
      yield put({
        type: 'setGuideLineData',
        payload: value,
      });
    },

    *setDragInfo({ value }: { value: Partial<DragData> }, { put }: any) {
      yield put({
        type: 'setDragData',
        payload: value,
      });
    },

    *setCallbackData(
      { value }: { value: ComponentData.TFilterConfig[] },
      { put }: any,
    ) {
      yield put({
        type: 'setCallback',
        payload: value,
      });
    },

    *setSelect({ value }: { value: string[] }, { put }: any) {
      yield put({
        type: 'setSelectData',
        payload: value,
      });
    },

    *setComponent(
      {
        value,
      }: {
        value:
          | Partial<ComponentData.TComponentData>
          | Partial<ComponentData.TComponentData>[];
      },
      { put }: any,
    ) {
      yield put({
        type: 'setComponentData',
        payload: value,
      });
    },

    *setComponentAll(
      {
        value,
      }: {
        value: ComponentData.TComponentData[];
      },
      { put }: any,
    ) {
      yield put({
        type: 'setComponentDataAll',
        payload: value,
      });
    },

    *setScale({ value }: { value: string[] }, { put }: any) {
      yield put({
        type: 'setScaleData',
        payload: value,
      });
    },

    *setClipboard({ value }: { value: string[] }, { put }: any) {
      yield put({
        type: 'setClipboardData',
        payload: value,
      });
    },

    *undo(_: any, { put }: any) {
      yield put({
        type: 'setUndoData',
      });
    },

    *redo(_: any, { put }: any) {
      yield put({
        type: 'setRedoData',
      });
    },
  },

  reducers: {
    setClipboardData(state: any, action: any) {
      set(state, 'clipboard', action.payload);
      return state;
    },

    setData(state: any, action: any) {
      const screenData = get(state, 'screenData');
      set(
        state,
        'screenData',
        mergeWithoutArray({}, screenData, action.payload),
      );
      return state;
    },

    setUndoData(state: any) {
      const history = get(state, 'history.value');
      return history.undo(state);
    },

    setRedoData(state: any) {
      const history = get(state, 'history.value');
      return history.redo(state);
    },

    setGuideLineData(state: any, action: any) {
      set(
        state,
        'guideLine',
        mergeWithoutArray({}, state.guideLine, action.payload),
      );
      return state;
    },

    setDragData(state: any, action: any) {
      set(state, 'drag', merge({}, get(state, 'drag'), action.payload));
      return state;
    },

    setCallback(state: any, action: any) {
      set(state, 'screenData.config.attr.filter', action.payload);
      return state;
    },

    setSelectData(state: any, action: any) {
      set(state, 'select', action.payload);
      return state;
    },

    setScaleData(state: any, action: any) {
      set(state, 'scale', action.payload);
      return state;
    },

    setComponentData(state: any, action: any) {
      const prevComponents = get(state, 'components');
      const history = get(state, 'history.value');

      const newComponents = ComponentUtil.setComponent(state, action);

      set(state, 'components', newComponents);

      // * history enqueue
      return history.enqueue(state, newComponents, prevComponents);
    },

    setComponentDataAll(state: any, action: any) {
      // * history enqueue
      const history = get(state, 'history.value');
      const components = get(state, 'components');

      let newComponents = action.payload;

      // ! 使用这种方法强制刷新
      newComponents = arrayMove(newComponents, 0, 0);

      set(state, 'components', newComponents);

      return history.enqueue(state, action.payload, components);
    },
  },
};
