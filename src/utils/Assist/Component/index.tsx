import { set, get } from 'lodash';
import { nanoid } from 'nanoid';
import arrayMove from 'array-move';
import { useComponentPath, useIdPathMap } from '@/hooks';
import { IGlobalModelState } from '@/models/connect';
import { getComponentDefaultConfigByType } from '@/components/ChartComponents';
import { mergeWithoutArray } from '../../tool';
import { EComponentType, EComponentSelfType } from '../../index';
import { DEFAULT_CONFIG } from '../../constants/screenData';

// 组件数据修改操作
class ComponentUtil {
  getRealIndex(
    list: ComponentData.TComponentData[],
    index: number | 'last' | 'first',
  ) {
    if (typeof index === 'number') return index;
    if (index === 'first') return 0;
    return list.length - 1;
  }

  addComponent(
    value: ComponentMethod.SetComponentMethodParamsData,
    path: string,
    parentPath: string,
    components: ComponentData.TComponentData[],
    newValue: SuperPartial<ComponentData.TComponentData<{}>>,
  ) {
    const targetAddParentComponents = path ? get(components, path) : components;
    targetAddParentComponents.push(newValue);
    if (path) {
      set(components, path, targetAddParentComponents);
    } else {
      components = targetAddParentComponents;
    }
    return components;
  }

  moveComponent(
    value: ComponentMethod.SetComponentMethodParamsData,
    path: string,
    parentPath: string,
    components: ComponentData.TComponentData[],
    newValue: SuperPartial<ComponentData.TComponentData<{}>>,
  ) {
    const target = get(components, path);
    const { id, index: targetIndex } = value;

    // inner
    if (target?.parent) {
      const parent = get(components, parentPath);
      const index = parent.findIndex((item: any) => item.id === id);
      const realIndex = this.getRealIndex(parent, targetIndex!);

      // set target new data
      const newComponents = arrayMove(parent, index, realIndex);
      const target = newComponents[realIndex];
      newComponents[realIndex] = mergeWithoutArray(target, newValue);

      set(components, parentPath, newComponents);
    }
    // outer
    else {
      const index = components.findIndex((item: any) => item.id === id);
      const realIndex = this.getRealIndex(components, targetIndex!);

      components = arrayMove(components, index, realIndex);

      // set target new data
      const target = components[realIndex];
      components[realIndex] = mergeWithoutArray(target, newValue);
    }

    return components;
  }

  deleteComponent(
    value: ComponentMethod.SetComponentMethodParamsData,
    path: string,
    parentPath: string,
    components: ComponentData.TComponentData[],
    newValue: SuperPartial<ComponentData.TComponentData<{}>>,
  ) {
    let targetDeleteParentComponents = parentPath
      ? get(components, parentPath)
      : components;
    const { id } = value;

    targetDeleteParentComponents = targetDeleteParentComponents.filter(
      (item: any) => item.id !== id,
    );
    if (parentPath) {
      set(components, parentPath, targetDeleteParentComponents);
    } else {
      components = targetDeleteParentComponents;
    }

    return components;
  }

  updateComponent(
    value: ComponentMethod.SetComponentMethodParamsData,
    path: string,
    parentPath: string,
    components: ComponentData.TComponentData[],
    newValue: SuperPartial<ComponentData.TComponentData<{}>>,
  ) {
    let targetUpdateParentComponents = parentPath
      ? get(components, parentPath)
      : components;
    const { id } = value;

    targetUpdateParentComponents = targetUpdateParentComponents.map(
      (item: any) => {
        if (item.id === id) {
          return mergeWithoutArray({}, item, newValue);
        }
        return item;
      },
    );
    if (parentPath) {
      set(components, parentPath, targetUpdateParentComponents);
    } else {
      components = targetUpdateParentComponents;
    }

    return components;
  }

  setComponent(state: IGlobalModelState, action: any) {
    const { payload } = action;

    let changeComponents: ComponentMethod.SetComponentMethodParamsData[] =
      Array.isArray(payload) ? payload : [payload];

    changeComponents = changeComponents.filter(
      (item) =>
        item.value &&
        (item.action === 'add' || item.id) &&
        (item.action !== 'move' ||
          typeof item.index === 'number' ||
          item.index === 'last' ||
          item.index === 'first'),
    );

    let components: ComponentData.TComponentData[] =
      get(state, 'components') || [];

    changeComponents.forEach((component) => {
      const { value, action, id } = component;

      // * 为了防止上次操作导致components结构发生变化
      // * 暂时设置每一次都刷新id-path-map
      useComponentPath(components);
      const idPathMap = useIdPathMap();
      const targetPath = idPathMap[id];
      if (!targetPath && action !== 'add') return;
      const { path = '' } = targetPath || {};

      const parentPath = getParentPath(path);
      const valueWithId = {
        ...value,
        id,
      };

      switch (action) {
        case 'add':
          components = this.addComponent(
            component,
            path,
            parentPath,
            components,
            valueWithId,
          );
          break;
        case 'delete':
          components = this.deleteComponent(
            component,
            path,
            parentPath,
            components,
            valueWithId,
          );
          break;
        case 'update':
          components = this.updateComponent(
            component,
            path,
            parentPath,
            components,
            valueWithId,
          );
          break;
        case 'move':
          components = this.moveComponent(
            component,
            path,
            parentPath,
            components,
            valueWithId,
          );
          break;
      }
    });

    // ! 使用这种方法强制刷新
    components = arrayMove(components, 0, 0);

    return components;
  }
}

const componentUtil = new ComponentUtil();

// generate template component
export const createComponent: (
  component: SuperPartial<ComponentData.TComponentData> & {
    componentType: ComponentData.TComponentSelfType;
  },
) => ComponentData.TComponentData = (component) => {
  const defaultConfig = getComponentDefaultConfigByType(
    component.componentType,
  );
  return mergeWithoutArray(
    {},
    {
      description: component.name || `component-${Date.now()}`,
      type: EComponentType.COMPONENT,
      config: mergeWithoutArray(
        {},
        DEFAULT_CONFIG,
        {
          interactive: {
            base: [],
          },
          data: {
            request: {
              url: '',
              method: 'POST',
              headers: {},
              body: {},
              frequency: {
                show: false,
                value: 15,
              },
              type: 'static',
              value: [],
              valueType: 'array',
            },
            filter: {
              show: false,
              fields: [],
              value: {},
              map: [],
            },
          },
        },
        defaultConfig,
      ),
    },
    component,
    {
      id: nanoid(),
    },
  );
};

// generate template group component
export const createGroupComponent = (
  component: SuperPartial<ComponentData.TComponentData>,
) => {
  const name = `组-${Date.now()}`;
  return mergeWithoutArray(
    {},
    {
      id: nanoid(),
      description: name,
      name,
      type: EComponentType.GROUP_COMPONENT,
      componentType: EComponentSelfType.GROUP_COMPONENT,
      config: {
        ...DEFAULT_CONFIG,
      },
    },
    component,
  );
};

// get parentPath
export const getParentPath = (path: string) => {
  const pathList = path.split('.');
  const parentPath = pathList.slice(0, -1).join('.');
  return parentPath;
};

export const getParentComponent = (
  components: ComponentData.TComponentData[],
  path: string,
) => {
  return get(components, getParentPath(path));
};

export const isGroupComponent = (
  component: SuperPartial<ComponentData.TComponentData> & {
    type: ComponentData.TComponentType;
  },
) => {
  return EComponentType.GROUP_COMPONENT === component.type;
};

export default componentUtil;
