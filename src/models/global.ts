import UndoHistory from 'react-undo-component/lib/Component/history';
import { set, get, merge } from 'lodash';
import { DEFAULT_SCREEN_DATA, ThemeMap } from '@/utils/constants';
import { mergeWithoutArray } from '@/utils/tool';

type DragData = {
  value: ComponentData.BaseComponentItem | null;
};
interface IGlobalModelState {
  screenData: Exclude<ComponentData.TScreenData, 'components'>;
  components: ComponentData.TScreenData['components'];
  guideLine: ComponentData.TGuideLineConfig;
  select: string[];
  componentSelect: ComponentData.TComponentData<any> | null;
  history: UndoHistory;
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
    history: null,
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
      let changeComponents: ComponentMethod.SetComponentMethodParamsData[] =
        Array.isArray(action.payload) ? action.payload : [action.payload];
      changeComponents = changeComponents.filter(
        (item: any) => typeof item === 'object' && item.id,
      );
      const changeComponentMaps = changeComponents.reduce((acc, cur) => {
        acc.set(cur.id, cur);
        return acc;
      }, new Map<string, ComponentMethod.SetComponentMethodParamsData>());
      const components: ComponentData.TComponentData[] =
        get(state, 'components') || [];

      const newComponents = components.map((component) => {
        const { id } = component;

        const target = changeComponentMaps.get(id);
        if (target) {
          return mergeWithoutArray({}, component, target);
        }

        return component;
      });

      set(state, 'components', newComponents);

      return state;
    },

    setComponentDataAll(state: any, action: any) {
      set(state, 'components', action.payload);
      return state;
    },
  },
};
