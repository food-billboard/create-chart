import { merge, cloneDeep } from 'lodash';
import arrayMove from 'array-move';
import { toJS } from 'mobx';
import { DEFAULT_SCREEN_DATA } from '@/utils/constants/screenData';
import { ThemeMap } from '@/utils/constants/theme';
import { mergeWithoutArray } from '@/utils/tool';
import { HistoryUtil } from '@/utils/Assist/History';
import ComponentUtil from '@/utils/Assist/Component';
import { ScreenDataRequest } from '@/utils/Assist/RequestPool';
import { DragData, IGlobalModelState, TUndoHistory } from './connect';

export default class {
  // 当前大屏的类型
  screenType: IGlobalModelState['screenType'] = 'edit';
  // 大屏
  screenData = DEFAULT_SCREEN_DATA;
  components = DEFAULT_SCREEN_DATA.components;
  guideLine: ComponentData.TGuideLineConfig = {
    show: true,
    value: [],
  };
  select: string[] = [];
  history: TUndoHistory = {
    value: new HistoryUtil(),
    isUndoDisabled: true,
    isRedoDisabled: true,
  };
  componentSelect = null;
  theme = ThemeMap.dark;
  clipboard: ComponentClipboard.LocalClipboardType = {
    timestamps: 0,
    value: [],
  };
  drag = {
    value: null,
  };
  scale = 100;
  version = '';

  getAllState(): IGlobalModelState {
    return {
      screenType: this.screenType,
      screenData: this.screenData,
      components: this.components,
      guideLine: this.guideLine,
      select: this.select,
      history: this.history,
      componentSelect: this.componentSelect,
      theme: this.theme,
      clipboard: this.clipboard,
      drag: this.drag,
      scale: this.scale,
      version: this.version,
    };
  }

  setScreenType(value: ComponentData.ScreenType) {
    this.screenType = value;
  }

  setScreen(
    value: ComponentMethod.GlobalUpdateScreenDataParams,
    init: boolean = false,
  ) {
    this.screenData = mergeWithoutArray({}, this.screenData, value);

    !init &&
      ScreenDataRequest(this.getAllState(), {
        type: 'screen',
        action: value,
      });
  }

  setVersion(value: string) {
    this.version = value;
  }

  setGuideLine(value: IGlobalModelState['guideLine'], init: boolean = false) {
    this.guideLine = mergeWithoutArray({}, this.guideLine, value);

    !init &&
      ScreenDataRequest(this.getAllState(), {
        type: 'guideLine',
        action: value,
      });
  }

  setDragInfo({ value }: { value: Partial<DragData> }) {
    this.drag = merge({}, this.drag, value);
  }

  setCallbackData(value: ComponentData.TFilterConfig[]) {
    this.screenData.config.attr.filter = value;

    ScreenDataRequest(this.getAllState(), {
      type: 'callback',
      action: value,
    });
  }

  setSelect(value: string[]) {
    this.select = value;
  }

  setComponent(
    value:
      | Partial<ComponentData.TComponentData>
      | Partial<ComponentData.TComponentData>[],
    enqueue: boolean = false,
  ) {
    const prevComponents = cloneDeep(toJS(this.components));
    const history = this.history.value;

    // ! 先看看其他会不会有问题再说
    // const newState = (Array.isArray(value) ? value : [value]).reduce(
    //   (state, value) => {
    //     const newComponents = ComponentUtil.setComponent(state, {
    //       ...action,
    //       payload: value,
    //     });
    //     set(state, 'components', newComponents);

    //     return state;
    //   },
    //   {
    //     ...state,
    //   },
    // );

    const newComponents = ComponentUtil.setComponent(this.getAllState(), {
      enqueue,
      payload: value,
    });
    this.components = newComponents;

    if (enqueue) {
      // * history enqueue
      return history.enqueue(this.getAllState(), newComponents, prevComponents);
    }
  }

  setComponentAll(
    newComponents: ComponentData.TComponentData[] | Function,
    enqueue: boolean = true,
  ) {
    // * history enqueue
    const history = this.history.value;
    const components = cloneDeep(toJS(this.components));

    newComponents = (
      typeof newComponents === 'function'
        ? newComponents(components)
        : newComponents
    ) as ComponentData.TComponentData[];

    // ! 使用这种方法强制刷新
    newComponents = arrayMove(newComponents, 0, 0);

    this.components = newComponents;

    if (!enqueue) return;

    history.enqueue(
      this.getAllState(),
      {
        enqueue,
        value: newComponents,
      } as any,
      components,
    );
  }

  setScale(value: number) {
    this.scale = value;
  }

  setClipboard(value: ComponentClipboard.LocalClipboardType) {
    this.clipboard = value;
  }

  undo() {
    const history = this.history.value;
    const newState = history.undo(this.getAllState());
    ScreenDataRequest(newState, {
      type: 'undo',
    });
  }

  redo() {
    const history = this.history.value;
    const newState = history.redo(this.getAllState());
    ScreenDataRequest(newState, {
      type: 'redo',
    });
  }

  setParams({ value }: { value: ComponentData.TParams[] }) {
    this.screenData.config.attr.params = value;
    ScreenDataRequest(this.getAllState(), {
      type: 'screen',
      action: {
        config: {
          attr: {
            params: value,
          },
        },
      },
    });
  }
}
