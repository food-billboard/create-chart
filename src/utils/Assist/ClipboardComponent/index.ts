import { get } from 'lodash';
import { useIdPathMap } from '@/hooks';
import { getDvaGlobalModelData, getComponent } from '../Component';
import LocalConfigInstance, { LocalConfig } from '../LocalConfig';
import GroupUtil from '../Group';

// 需要特殊处理的一些组件的配置
const NEED_DEAL_COMPONENT_MAP: any = {};

class ClipboardComponent {
  async getRealComponentClipboard(
    clipboard: ComponentClipboard.LocalClipboardType,
  ) {
    const id = get(getDvaGlobalModelData(), 'screenData._id');
    const result =
      await LocalConfigInstance.getItem<ComponentClipboard.StorageClipboardType>(
        LocalConfig.CONFIG_KEY_CROSS_CLIPBOARD,
      );

    if (result.errMsg) throw new Error();

    const storageClipboard = result.value;

    let clipboardComponents: ComponentData.TComponentData[] = [];
    let isStorage = false;

    if (
      storageClipboard?.show &&
      (storageClipboard.timestamps > clipboard.timestamps ||
        (storageClipboard.timestamps === clipboard.timestamps &&
          storageClipboard.screenId !== id))
    ) {
      clipboardComponents = storageClipboard.value;
      isStorage = true;
    } else {
      clipboardComponents = this.geComponentsBySelect(clipboard.value, false);
      isStorage = false;
    }

    return {
      clipboardComponents,
      isStorage,
    };
  }

  geComponentsBySelect(select: string[], filter = true) {
    const idPathMap = useIdPathMap();
    const state = getDvaGlobalModelData();
    const components = state.components;
    return select.reduce<ComponentData.TComponentData[]>((acc, cur) => {
      let component: ComponentData.TComponentData;
      if (!filter) {
        component = getComponent(cur, components);
      } else {
        const path = idPathMap[cur].path;
        component = get(components, path);
        if (component) component = this.filterComponentConfig(component);
      }
      if (component) {
        acc.push(GroupUtil.covertComponentPosition(component, components));
      }
      return acc;
    }, []);
  }

  filterComponentConfig(
    component: ComponentData.TComponentData,
  ): ComponentData.TComponentData {
    const {
      components,
      config: { interactive, data },
      componentType,
    } = component;
    const options =
      NEED_DEAL_COMPONENT_MAP[componentType]?.(component.config.options) ??
      component.config.options;
    return {
      ...component,
      config: {
        ...component.config,
        options: {
          ...options,
          condition: options.condition && {
            ...options.condition,
            value: [],
          },
        },
        data: {
          request: {
            ...data?.request,
            mock:
              data?.request.mock &&
              ({
                ...data?.request.mock,
                fields: [],
              } as any),
          } as any,
          filter:
            data?.filter &&
            ({
              ...data.filter,
              value: [],
              map:
                data?.filter?.map.map((item) => {
                  return {
                    ...item,
                    map: '',
                  };
                }) || [],
            } as any),
        },
        interactive: {
          ...interactive,
          base:
            interactive?.base.map((item) => {
              return {
                ...item,
                fields: item.fields.map((item) => {
                  return {
                    ...item,
                    variable: '',
                  };
                }),
              };
            }) || [],
          linkage:
            interactive?.linkage.map((item) => {
              return {
                ...item,
                value: '',
              };
            }) || [],
        },
      },
      components: components?.map((component) =>
        this.filterComponentConfig(component),
      ),
    };
  }
}

export default new ClipboardComponent();
