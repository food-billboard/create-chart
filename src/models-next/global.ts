import { merge, cloneDeep } from 'lodash';
import arrayMove from 'array-move';
import { toJS, makeAutoObservable } from 'mobx';
import { DEFAULT_SCREEN_DATA } from '@/utils/constants/screenData';
import { ThemeMap } from '@/utils/constants/theme';
import { mergeWithoutArray } from '@/utils/tool';
import { HistoryUtil } from '@/utils/Assist/History';
import ComponentUtil from '@/utils/Assist/Component';
import { ScreenDataRequest } from '@/utils/Assist/RequestPool';
import { DragData, IGlobalModelState, TUndoHistory } from './connect';

const HISTORY = new HistoryUtil();

export default class {
  constructor() {
    makeAutoObservable(
      this,
      {},
      {
        autoBind: true,
      },
    );
  }

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
    let result = {
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
    return result;
  }

  setScreenType = (value: ComponentData.ScreenType) => {
    this.screenType = value;
  };

  setScreen = (
    value: ComponentMethod.GlobalUpdateScreenDataParams,
    init: boolean = false,
  ) => {
    this.screenData = mergeWithoutArray({}, this.screenData, value);

    !init &&
      ScreenDataRequest(this.getAllState(), {
        type: 'screen',
        action: value,
      });
  };

  setVersion = (value: string) => {
    this.version = value;
  };

  setGuideLine = (
    value: IGlobalModelState['guideLine'],
    init: boolean = false,
  ) => {
    this.guideLine = mergeWithoutArray({}, this.guideLine, value);

    !init &&
      ScreenDataRequest(this.getAllState(), {
        type: 'guideLine',
        action: value,
      });
  };

  setDragInfo = ({ value }: { value: Partial<DragData> }) => {
    this.drag = merge({}, this.drag, { value });
  };

  setCallbackData = (value: ComponentData.TFilterConfig[]) => {
    this.screenData.config.attr.filter = value;

    ScreenDataRequest(this.getAllState(), {
      type: 'callback',
      action: value,
    });
  };

  setSelect = (value: string[]) => {
    this.select = value;
  };

  setComponent = (
    value:
      | Partial<ComponentData.TComponentData>
      | Partial<ComponentData.TComponentData>[],
    enqueue: boolean = false,
  ) => {
    const prevComponents = cloneDeep(toJS(this.components));

    const newComponents = ComponentUtil.setComponent(this.getAllState(), {
      enqueue,
      payload: value,
    });
    this.components = newComponents;

    if (enqueue) {
      // * history enqueue
      return HISTORY.enqueue(this.getAllState(), newComponents, prevComponents);
    }
  };

  setComponentAll(
    newComponents: ComponentData.TComponentData[] | Function,
    enqueue: boolean = true,
  ) {
    // * history enqueue
    const components = cloneDeep(this.components);

    const nextComponents = (
      typeof newComponents === 'function'
        ? newComponents(components)
        : newComponents
    ) as ComponentData.TComponentData[];

    this.components = nextComponents;

    if (!enqueue) return;

    HISTORY.enqueue(
      this.getAllState(),
      {
        enqueue,
        value: nextComponents,
      } as any,
      components,
    );
  }

  setScale = (value: number) => {
    this.scale = value;
  };

  setClipboard = (value: ComponentClipboard.LocalClipboardType) => {
    this.clipboard = value;
  };

  undo = () => {
    const newState = HISTORY.undo(this.getAllState());
    ScreenDataRequest(newState, {
      type: 'undo',
    });
  };

  redo = () => {
    const newState = HISTORY.redo(this.getAllState());
    ScreenDataRequest(newState, {
      type: 'redo',
    });
  };

  setParams = ({ value }: { value: ComponentData.TParams[] }) => {
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
  };
}
