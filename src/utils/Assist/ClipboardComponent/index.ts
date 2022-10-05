import { get } from 'lodash';
import { useIdPathMap } from '@/hooks';
import { getDvaGlobalModelData } from '../Component';
import LocalConfigInstance, { LocalConfig } from '../LocalConfig';

// 需要特殊处理的一些组件的配置
const NEED_DEAL_COMPONENT_MAP: any = {};

class ClipboardComponent {
  async getRealComponentClipboard(
    clipboard: ComponentClipboard.LocalClipboardType,
  ) {
    const id = get(getDvaGlobalModelData(), 'screenData._id');
    const storageClipboard = await LocalConfigInstance.getItem(
      LocalConfig.CONFIG_KEY_CROSS_CLIPBOARD,
    );

    let clipboardComponents: ComponentData.TComponentData[] = [];
    let isStorage = false;

    if (
      storageClipboard?.show &&
      storageClipboard.timestamps > clipboard.timestamps &&
      storageClipboard.screenId !== id
    ) {
      clipboardComponents = storageClipboard.value;
      isStorage = true;
    } else {
      clipboardComponents = this.geComponentsBySelect(clipboard.value);
      isStorage = false;
    }

    return {
      clipboardComponents,
      isStorage,
    };
  }

  geComponentsBySelect(select: string[]) {
    const idPathMap = useIdPathMap();
    const components = getDvaGlobalModelData();
    return select.reduce<ComponentData.TComponentData[]>((acc, cur) => {
      const path = idPathMap[cur].path;
      const component = get(components, path);
      if (component) acc.push(this.filterComponentConfig(component));
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
                fields: [],
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
