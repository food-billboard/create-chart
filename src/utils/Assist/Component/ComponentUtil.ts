import arrayMove from 'array-move';
import { set, get, merge, pick, isNil, omit } from 'lodash';
import { useComponentPath, useIdPathMap } from '@/hooks';
import { IGlobalModelState } from '@/models/connect';
import { isGroupComponent, isComponentParentEqual } from '.';
import { mergeWithoutArray } from '../../tool';
import GroupUtil from '../Group';
import { ScreenDataRequest } from '../RequestPool';

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
    extra: any,
  ) {
    const idPathMap = useIdPathMap();
    const calParentPath = idPathMap[newValue.parent as string]?.path;
    const realCalParentPath = `${calParentPath}.components`;
    const targetAddParentComponents = calParentPath
      ? get(components, realCalParentPath)
      : components;
    if (extra && !isNil(extra.index)) {
      targetAddParentComponents.splice(extra.index, 0, newValue);
    } else if (extra && extra.nearComponent) {
      const targetIndex = targetAddParentComponents.findIndex(
        (item: any) => item.id === extra.nearComponent,
      );
      if (!!~targetIndex) {
        targetAddParentComponents.splice(targetIndex + 1, 0, newValue);
      } else {
        targetAddParentComponents.push(newValue);
      }
    } else {
      targetAddParentComponents.push(newValue);
    }
    if (calParentPath) {
      set(components, realCalParentPath, targetAddParentComponents);
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

    let originDropKey = node.key;
    let dropKey = originDropKey;
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
    const dragPath = idPathMap[dragKey]?.path;
    let dragObj: ComponentData.TComponentData = get(components, dragPath);

    if (!dropToGap) {
      // Drop on the content
      loop(data, dropKey, (item, index) => {
        // 组
        if (isGroupComponent(item)) {
          dropKey = item.id;
          dropIndex = dropPosition;
        }
        // 组内组件 | 最外层组件
        else {
          dropKey = item.parent;
          dropIndex = index;
        }
      });
    } else if (
      node.hasChildren && // Has children
      node.expanded && // Is expanded
      dropPosition === 1 // On the bottom gap
    ) {
      // ! 因为没看到有进来过，暂时去掉
      return [];
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
        // 组
        if (isGroupComponent(item)) {
          // 放在了组的最下面，其实就是放在了当前组的外面
          if (dropPosition === 1) {
            dropIndex =
              infoDropPosition -
              (isComponentParentEqual(dropKey, dragObj.parent) ? 2 : 0);
          } else {
            dropIndex = dropPosition;
          }
        }
        // 组内组件 | 最外层组件
        else {
          dropIndex = index;
        }
      });
    }

    // 拖拽放置的组件或组
    const dropPath = idPathMap[originDropKey].path;
    const dropComponent = get(components, dropPath);
    const dropComponentParent = dropComponent?.parent;
    // 放置组下的直接子id
    let dropComponentDirectChildrenIds: string[] = [];
    if (isGroupComponent(dropComponent)) {
      dropComponentDirectChildrenIds = (dropComponent?.components || []).map(
        (item: any) => item.id,
      );
    } else if (dropComponentParent) {
      const dropPath = idPathMap[dropComponentParent].path;
      const dropComponent = get(components, dropPath);
      dropComponentDirectChildrenIds = (dropComponent?.components || []).map(
        (item: any) => item.id,
      );
    } else {
      dropComponentDirectChildrenIds = components.map((item) => item.id);
    }

    // 拖拽放置是否为组
    const isEqual = dropKey === originDropKey;

    // 如果为组件放组，则直接使用复制方法
    if (isEqual) {
      const updateResult = GroupUtil.addComponentsToGroup(
        components,
        dropComponent,
        select.map((item: string) => {
          const path = idPathMap[item].path;
          let newComponent = get(components, path);
          // 修改组件的实际位置，可能存在组件在组中
          const formatComponentPosition = GroupUtil.getComponentPosition(
            newComponent,
            components,
          );
          newComponent = merge({}, newComponent, {
            config: {
              style: {
                ...pick(
                  formatComponentPosition || {},
                  'left',
                  'top',
                  'width',
                  'height',
                ),
              },
            },
          });
          if (isGroupComponent(newComponent)) {
            newComponent = merge({}, newComponent, {
              config: {
                attr: {
                  prevScaleX: newComponent.config.attr.scaleX,
                  prevScaleY: newComponent.config.attr.scaleY,
                  ...pick(formatComponentPosition || {}, 'scaleX', 'scaleY'),
                },
              },
            });
          }
          return newComponent;
        }),
      );

      const realUpdateResult: ComponentMethod.SetComponentMethodParamsData[] =
        select.map((item: string) => {
          return {
            action: 'delete',
            id: item,
            value: {},
          };
        });

      let addIndex = 0;
      updateResult
        .map((item) => ({ ...item, originAction: item.originAction ?? 'drag' }))
        .forEach((item) => {
          if (item.action === 'add') {
            realUpdateResult.push({
              ...item,
              extra: {
                index: dropIndex + addIndex,
              },
            });
            addIndex++;
          } else {
            realUpdateResult.push(item);
          }
        });

      return realUpdateResult;
    }

    const updateResult = GroupUtil.generateGroupConfig({
      select: [
        ...select.filter((item: string) => item !== originDropKey),
        originDropKey,
      ].filter(Boolean),
      components,
      clickTarget: dropComponent,
    });

    const realUpdateResult: ComponentMethod.SetComponentMethodParamsData[] = [];
    let coverUpdateResult!: ComponentMethod.SetComponentMethodParamsData;
    let parentUpdateResult!: ComponentMethod.SetComponentMethodParamsData;

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

    const coverUpdateResultStyle = get(
      coverUpdateResult?.value,
      'config.style',
    );

    // 放置在最外的最前
    if (dropIndex === -1) {
      realUpdateResult.push(
        ...((coverUpdateResult?.value.components || [])
          .filter((item) => item?.id !== originDropKey)
          .map((item, index) => {
            return {
              action: 'add',
              id: item?.id,
              value: merge({}, omit(item, 'parent'), {
                parent: undefined,
                config: {
                  style: {
                    left:
                      (item?.config?.style?.left || 0) +
                      (coverUpdateResultStyle?.left || 0),
                    top:
                      (item?.config?.style?.top || 0) +
                      (coverUpdateResultStyle?.top || 0),
                  },
                },
              }),
              path: '',
              extra: {
                index,
              },
            };
          }) as any),
      );
    }
    // 如果放置在组上，则去掉外层的组，并将放置组继承新组的样式
    else if (isEqual) {
      return;
      const scaleX = get(dropComponent, 'config.attr.scaleX') || 1;
      const scaleY = get(dropComponent, 'config.attr.scaleY') || 1;

      realUpdateResult.push(
        ...((coverUpdateResult?.value.components || []).map((item, index) => {
          let value: any = {};
          const isOriginDropItem = item?.id === originDropKey;
          if (isOriginDropItem) {
            value = {
              parent: dropComponentParent,
              config: {
                style: pick(coverUpdateResultStyle, [
                  'left',
                  'top',
                  'width',
                  'height',
                ]),
              },
            };
          } else {
            value = merge({}, item, {
              parent: originDropKey,
              config: {
                style: {
                  // * 因为没有做过特殊处理，需要单独处理当前层级的缩放
                  width: (item?.config?.style?.width || 0) / scaleX,
                  height: (item?.config?.style?.height || 0) / scaleY,
                  left:
                    (item?.config?.style?.left || 0) / scaleX +
                    (coverUpdateResultStyle?.left || 0),
                  top:
                    (item?.config?.style?.top || 0) / scaleY +
                    (coverUpdateResultStyle?.top || 0),
                },
              },
            });
          }
          return {
            action: isOriginDropItem ? 'update' : ('add' as any),
            id: item?.id,
            value,
            path: `${dropPath}.components`,
            extra: {
              index: dropIndex + index, //+ (dropComponentDirectChildrenIds.includes(item?.id) ? 0 : 1),
            },
          };
        }) as any),
      );
    } else {
      let nearComponentId = dropComponent.id;
      realUpdateResult.push(
        ...((coverUpdateResult?.value.components || []).map((item, index) => {
          const nearComponent = nearComponentId;

          if (item?.id !== originDropKey) {
            nearComponentId = item!.id;
          }

          return {
            action: item?.id === originDropKey ? 'update' : ('add' as any),
            id: item?.id,
            value: merge({}, omit(item, 'parent'), {
              parent: parentUpdateResult?.id || dropKey,
              config: {
                style: {
                  left:
                    (item?.config?.style?.left || 0) +
                    (coverUpdateResultStyle?.left || 0),
                  top:
                    (item?.config?.style?.top || 0) +
                    (coverUpdateResultStyle?.top || 0),
                },
              },
            }),
            path: getParentPath(dropPath),
            extra: {
              nearComponent,
            },
          };
        }) as any),
      );
    }

    const { addAction, deleteAction, anotherAction } = realUpdateResult.reduce<{
      deleteAction: ComponentMethod.SetComponentMethodParamsData[];
      addAction: ComponentMethod.SetComponentMethodParamsData[];
      anotherAction: ComponentMethod.SetComponentMethodParamsData[];
    }>(
      (acc, cur) => {
        if (cur.action === 'delete') {
          acc.deleteAction.push(cur);
        } else if (cur.action === 'add') {
          acc.addAction.push(cur);
        } else {
          acc.anotherAction.push(cur);
        }

        return acc;
      },
      {
        deleteAction: [],
        addAction: [],
        anotherAction: [],
      },
    );

    const sortActionResult = [...anotherAction, ...deleteAction, ...addAction];

    return sortActionResult;
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
    const { payload, needNotRequest } = action;

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
            extra,
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
          const newActionComponents4Group = this.groupComponent(
            component,
            path,
            parentPath,
            components,
            valueWithId,
          );
          components = this.setComponent(state, {
            payload: newActionComponents4Group,
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
          const newActionComponents4Drag = this.dargSortComponent(
            component,
            path,
            parentPath,
            components,
            valueWithId,
            extra,
          );
          components = this.setComponent(state, {
            payload: newActionComponents4Drag,
          });
          component.callback?.(components, null);
          break;
      }
    });

    // ! 使用这种方法强制刷新
    components = arrayMove(components, 0, 0);

    // 上传大屏的数据到后台
    !needNotRequest &&
      ScreenDataRequest(
        {
          ...state,
          components,
        },
        {
          type: 'component',
          action: payload,
        },
      );

    return components;
  }
}

export default ComponentUtil;
