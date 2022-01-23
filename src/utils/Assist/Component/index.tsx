import { set, get, template } from 'lodash';
import arrayMove from 'array-move';
import { IGlobalModelState } from '@/models/connect';
import { mergeWithoutArray } from '../../tool';

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
    if (target.parent) {
      const parent = get(components, parentPath);
      const index = parent.findIndex((item: any) => item.id === id);
      const realIndex = this.getRealIndex(parent, targetIndex!);

      // set target new data
      const newComponents = arrayMove(parent, index, realIndex);
      const target = newComponents[realIndex];
      newComponents[realIndex] = mergeWithoutArray(target, newValue);

      set(components, parentPath, newComponents);

      // ! 使用这种方法强制刷新
      components = arrayMove(components, 0, 0);
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

    components = arrayMove(components, 0, 0);

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
      const { value, action, path, id } = component;
      const pathList = path.split('.');
      const parentPath = pathList.slice(0, -1).join('.');
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

    return components;
  }
}

const componentUtil = new ComponentUtil();

export default componentUtil;
