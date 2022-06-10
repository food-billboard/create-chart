import arrayMove from 'array-move';
import { set, get, merge } from 'lodash';
import { useComponentPath, useIdPathMap } from '@/hooks';
import { IGlobalModelState } from '@/models/connect';
import GroupUtil from '../Group';
import { mergeWithoutArray } from '../../tool';
import { isGroupComponent } from '.';

// get parentPath
export const getParentPath = (path: string) => {
  const pathList = path.split('.');
  const parentPath = pathList.slice(0, -1).join('.');
  return parentPath;
};

// 组件数据修改操作
class ComponentUtil {
  getRealIndex(
    list: ComponentData.TComponentData[],
    index: number | 'last' | 'first' | 'next' | 'prev',
    currentIndex: number,
  ) {
    if (typeof index === 'number') return index;
    if (index === 'first') return 0;
    if (index === 'next')
      return currentIndex + 1 >= list.length - 1
        ? list.length - 1
        : currentIndex + 1;
    if (index === 'prev') return currentIndex - 1 <= 0 ? 0 : currentIndex - 1;
    return list.length - 1;
  }

  // 新增
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
    value.callback?.(components, newValue);
    return components;
  }

  // 移动
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
      const realIndex = this.getRealIndex(parent, targetIndex!, index);

      // set target new data
      const newComponents = arrayMove(parent, index, realIndex);
      const target = newComponents[realIndex];
      newComponents[realIndex] = mergeWithoutArray(target, newValue);

      set(components, parentPath, newComponents);
    }
    // outer
    else {
      const index = components.findIndex((item: any) => item.id === id);
      const realIndex = this.getRealIndex(components, targetIndex!, index);

      components = arrayMove(components, index, realIndex);

      // set target new data
      const target = components[realIndex];
      components[realIndex] = mergeWithoutArray(target, newValue);
    }

    value.callback?.(components, newValue);

    return components;
  }

  // 删除
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

    value.callback?.(components, id);

    return components;
  }

  // 更新
  updateComponent(
    value: ComponentMethod.SetComponentMethodParamsData,
    path: string,
    parentPath: string,
    components: ComponentData.TComponentData[],
    newValue: SuperPartial<ComponentData.TComponentData<{}>>,
    // 是否覆盖更新
    cover = false,
  ) {
    let targetUpdateParentComponents = parentPath
      ? get(components, parentPath)
      : components;
    const { id } = value;

    targetUpdateParentComponents = targetUpdateParentComponents.reduce(
      (acc: any, item: any) => {
        if (item.id === id) {
          if (cover) {
            acc.push(newValue);
          } else {
            acc.push(mergeWithoutArray({}, item, newValue));
          }
        } else {
          acc.push(item);
        }
        return acc;
      },
      [],
    );
    if (parentPath) {
      set(components, parentPath, targetUpdateParentComponents);
    } else {
      components = targetUpdateParentComponents;
    }

    value.callback?.(components, targetUpdateParentComponents);

    return components;
  }

  // 成组
  groupComponent(
    value: ComponentMethod.SetComponentMethodParamsData,
    path: string,
    parentPath: string,
    components: ComponentData.TComponentData[],
    newValue: SuperPartial<ComponentData.TComponentData<{}>>,
  ) {
    const { id, ...nextNewValue } = newValue;
    const select = id?.split(',') || [];
    const realNewValue = {
      ...nextNewValue,
      id: select[0],
    };

    let groupId = '';

    const newComponents = GroupUtil.generateGroupConfig({
      select,
      components,
      clickTarget: realNewValue as ComponentData.TComponentData,
      callback: (id) => {
        groupId = id;
      },
    });

    value.callback?.(components, groupId);

    return newComponents;
  }

  // 取消成组
  unGroupComponent(
    value: ComponentMethod.SetComponentMethodParamsData,
    path: string,
    parentPath: string,
    components: ComponentData.TComponentData[],
    newValue: SuperPartial<ComponentData.TComponentData<{}>>,
  ) {
    const newComponents = GroupUtil.splitGroupConfig({
      clickTarget: newValue as ComponentData.TComponentData,
      components,
      select: [newValue.id as string],
    });
    value.callback?.(newComponents, null);
    return newComponents;
  }

  // 拖拽排序
  dargSortComponent(
    value: ComponentMethod.SetComponentMethodParamsData,
    path: string,
    parentPath: string,
    components: ComponentData.TComponentData[],
    newValue: SuperPartial<ComponentData.TComponentData<{}>>,
    extra: any,
  ) {
    const {
      node,
      dragNode,
      dropToGap,
      dropPosition: infoDropPosition,
      select,
    } = extra;
    const idPathMap = useIdPathMap();

    const originDropKey = node.key;
    let dropKey = node.key;
    let dropIndex = -1;
    const dragKey = dragNode.key;
    const dropPos = node.pos.split('-');
    const dropPosition = infoDropPosition - Number(dropPos[dropPos.length - 1]);

    const loop = (
      data: ComponentData.TComponentData[],
      key: string,
      callback: (
        item: ComponentData.TComponentData,
        index: number,
        data: ComponentData.TComponentData[],
      ) => void,
    ) => {
      for (let i = 0; i < data.length; i++) {
        if (data[i].id === key) {
          return callback(data[i], i, data);
        }
        if (isGroupComponent(data[i])) {
          loop(data[i].components, key, callback);
        }
      }
    };

    const data = [...components];

    // Find dragObject
    let dragObj!: ComponentData.TComponentData;
    const addComponents = select.forEach((item: string) => {
      const path = idPathMap[item].path;
      const component = get(components, path);
      if (item === dragKey) dragObj = component;
      return component;
    });

    if (!dropToGap) {
      // Drop on the content
      loop(data, dropKey, (item, index) => {
        dropIndex = index + 1;
        // 组
        if (isGroupComponent(item)) {
          dropKey = item.id;
        }
        // 组内组件 | 最外层组件
        else {
          dropKey = item.parent;
        }
      });
    } else if (
      node.hasChildren && // Has children
      node.expanded && // Is expanded
      dropPosition === 1 // On the bottom gap
    ) {
      // ! 因为没看到有进来过，暂时去掉
      return data;
      loop(data, dropKey, (item) => {
        item.components = item.components || [];
        // where to insert 示例添加到头部，可以是随意位置
        dragObj.parent = item.id;
        item.components.unshift(dragObj);
        // in previous version, we use item.children.push(dragObj) to insert the
        // item to the tail of the children
      });
    } else {
      loop(data, dropKey, (item, index) => {
        dropKey = item.parent;
        dropIndex = dropPosition === -1 ? index : index + 1;
      });
    }

    const dropPath = idPathMap[originDropKey].path;
    const dropComponent = get(components, dropPath);

    const updateResult = GroupUtil.generateGroupConfig({
      select,
      components,
      clickTarget: dropComponent,
    });

    const realUpdateResult: ComponentMethod.SetComponentMethodParamsData[] = [];
    let coverUpdateResult!: ComponentMethod.SetComponentMethodParamsData;
    let parentUpdateResult: ComponentMethod.SetComponentMethodParamsData;

    updateResult.forEach((item) => {
      if (item.action === 'cover_update') {
        coverUpdateResult = item;
      } else if (item.id === dropKey) {
        parentUpdateResult = item;
        item.id && realUpdateResult.push(item);
      } else if (item.action === 'delete') {
        realUpdateResult.unshift(item);
      } else {
        realUpdateResult.push(item);
      }
    });

    realUpdateResult.push(
      ...((coverUpdateResult?.value.components || []).map((item) => {
        return {
          action: 'add' as any,
          id: item?.id,
          value: merge({}, item, {
            parent: parentUpdateResult?.value.id,
          }),
        };
      }) as any),
    );

    console.log(
      updateResult,
      realUpdateResult,
      dropIndex,
      originDropKey,
      22222,
    );
    return components;

    value.callback?.(data, null);

    return data;
  }

  isAddParamsValid = (value: ComponentMethod.SetComponentMethodParamsData) => {
    return ['add', 'drag'].includes(value.action) || value.id;
  };

  isMoveParamsValid = (value: ComponentMethod.SetComponentMethodParamsData) => {
    return (
      value.action !== 'move' ||
      typeof value.index === 'number' ||
      value.index === 'last' ||
      value.index === 'first' ||
      value.index === 'prev' ||
      value.index === 'next'
    );
  };

  setComponent(state: IGlobalModelState, action: any) {
    const { payload } = action;

    let changeComponents: ComponentMethod.SetComponentMethodParamsData[] =
      Array.isArray(payload) ? payload : [payload];

    changeComponents = changeComponents.filter(
      (item) =>
        item.value &&
        this.isAddParamsValid(item) &&
        this.isMoveParamsValid(item),
    );

    let components: ComponentData.TComponentData[] =
      get(state, 'components') || [];

    changeComponents.forEach((component) => {
      const { value, action, id, path: componentPath, extra } = component;

      // * 为了防止上次操作导致components结构发生变化
      // * 暂时设置每一次都刷新id-path-map
      useComponentPath(components);
      const idPathMap = useIdPathMap();
      const targetPath = idPathMap[id];
      if (!targetPath && !['add', 'group', 'drag'].includes(action)) return;
      const { path = '' } = targetPath || {};

      const parentPath = getParentPath(path);
      const valueWithId = {
        ...value,
      };
      // ? 成组时 可能存在覆盖更新并且覆盖id 的情况
      if (action !== 'cover_update' || !value.id) valueWithId.id = id;

      switch (action) {
        case 'add':
          components = this.addComponent(
            component,
            componentPath ?? path,
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
        case 'cover_update':
          components = this.updateComponent(
            component,
            path,
            parentPath,
            components,
            valueWithId,
            true,
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
        case 'group':
          const newActionComponents = this.groupComponent(
            component,
            path,
            parentPath,
            components,
            valueWithId,
          );
          components = this.setComponent(state, {
            payload: newActionComponents,
          });
          break;
        case 'un_group':
          components = this.unGroupComponent(
            component,
            path,
            parentPath,
            components,
            valueWithId,
          );
          break;
        case 'drag':
          components = this.dargSortComponent(
            component,
            path,
            parentPath,
            components,
            valueWithId,
            extra,
          );
          break;
      }
    });

    // ! 使用这种方法强制刷新
    components = arrayMove(components, 0, 0);

    return components;
  }
}

export default ComponentUtil;
