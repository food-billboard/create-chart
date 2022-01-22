import UndoHistory from 'react-undo-component/lib/Component/history';
import { set, get, merge } from 'lodash';
import arrayMove from 'array-move';
import { DEFAULT_SCREEN_DATA, ThemeMap } from '@/utils/constants';
import { mergeWithoutArray } from '@/utils/tool';
import { HistoryUtil } from '@/utils/history';

type DragData = {
  value: ComponentData.BaseComponentItem | null;
};
interface IGlobalModelState {
  screenData: Exclude<ComponentData.TScreenData, 'components'>;
  components: ComponentData.TScreenData['components'];
  guideLine: ComponentData.TGuideLineConfig;
  select: string[];
  componentSelect: ComponentData.TComponentData<any> | null;
  history: {
    value: UndoHistory;
    isUndoDisabled: boolean;
    isRedoDisabled: boolean;
  };
  theme: ThemeMap;
  clipboard: ComponentData.TComponentData<any>[];

  drag: DragData;
  scale: number;
}

export { IGlobalModelState };

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
    *setScreenName({ value }: { value: string }, { put }: any) {
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

    *setDragInfo({ value }: { value: DragData }, { put }: any) {
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

    *undo({ value }: { value: string[] }, { put }: any) {
      yield put({
        type: 'setScaleData',
        payload: value,
      });
    },

    *redo() {},
  },

  reducers: {
    setData(state: any, action: any) {
      set(state, 'screenData.name', action.payload);
      return state;
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
      const history = get(state, 'history.value');

      let changeComponents: ComponentMethod.SetComponentMethodParamsData[] =
        Array.isArray(action.payload) ? action.payload : [action.payload];
      changeComponents = changeComponents.filter(
        (item) => item.value && (item.action === 'add' || item.id),
      );

      let components: ComponentData.TComponentData[] =
        get(state, 'components') || [];

      changeComponents.forEach((component) => {
        const { id, value, action, path } = component;
        const pathList = path.split('.');
        const parentPath = pathList.slice(0, -1).join('.');

        switch (action) {
          case 'add':
            const targetAddParentComponents = path
              ? get(components, path)
              : components;
            targetAddParentComponents.push(value);
            if (path) {
              set(components, path, targetAddParentComponents);
            } else {
              components = targetAddParentComponents;
            }
            break;
          case 'delete':
            let targetDeleteParentComponents = parentPath
              ? get(components, parentPath)
              : components;
            targetDeleteParentComponents = targetDeleteParentComponents.filter(
              (item: any) => item.id !== id,
            );
            if (parentPath) {
              set(components, parentPath, targetDeleteParentComponents);
            } else {
              components = targetDeleteParentComponents;
            }
            break;
          case 'update':
            let targetUpdateParentComponents = parentPath
              ? get(components, parentPath)
              : components;
            targetUpdateParentComponents = targetUpdateParentComponents.map(
              (item: any) => {
                if (item.id === id) {
                  return mergeWithoutArray({}, item, value);
                }
                return item;
              },
            );
            if (parentPath) {
              set(components, parentPath, targetUpdateParentComponents);
            } else {
              components = targetUpdateParentComponents;
            }
            break;
          case 'move':
            const target = get(components, path);
            if (target.parent) {
              const parent = get(components, parentPath);
              const index = parent.findIndex((item: any) => item.id === id);

              // set target new data
              const newComponents = arrayMove(parent, index, parent.length - 1);
              const target = newComponents[newComponents.length - 1];
              newComponents[newComponents.length - 1] = mergeWithoutArray(
                target,
                value,
              );

              set(components, parentPath, newComponents);
            } else {
              const index = components.findIndex((item: any) => item.id === id);
              components = arrayMove(components, index, components.length - 1);

              // set target new data
              const target = components[components.length - 1];
              components[components.length - 1] = mergeWithoutArray(
                target,
                value,
              );
            }
        }
      });

      set(state, 'components', components);

      // * history enqueue
      history.enqueue(state, newComponents, components);

      return state;
    },

    setComponentDataAll(state: any, action: any) {
      // * history enqueue
      const history = get(state, 'history.value');
      const components = get(state, 'components');

      set(state, 'components', action.payload);

      history.enqueue(state, action.payload, components);

      return state;
    },
  },
};
