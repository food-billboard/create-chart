import { get, set, merge } from 'lodash';
import { useIdPathMap, useComponentPath } from '@/hooks';
import ComponentUtil, {
  getParentComponent,
  getParentPath,
  createGroupComponent,
  isGroupComponent,
} from '../Component';
import { mergeWithoutArray } from '../../tool';

class GroupUtil {
  getComponentPosition = (
    value: ComponentData.TComponentData,
    components: ComponentData.TComponentData[],
  ) => {
    const idPathMap = useIdPathMap();
    const {
      id,
      parent,
      config: {
        style: { left, top },
      },
    } = value;
    const targetPath = idPathMap[id];
    const { path } = targetPath;
    let initPosition = {
      left,
      top,
    };

    if (parent) {
      let parentPath: string = getParentPath(path);
      let parentComponent: ComponentData.TComponentData = getParentComponent(
        components,
        parentPath,
      );

      function getParent() {
        parentPath = getParentPath(parentPath);
        parentComponent = getParentComponent(components, parentPath);
        if (Array.isArray(parentComponent)) {
          getParent();
        }
      }

      getParent();

      while (parentComponent) {
        const {
          config: {
            style: { left, top },
            attr: { scaleX = 1, scaleY = 1 },
          },
        } = parentComponent as ComponentData.TComponentData;

        initPosition.left /= scaleX;
        initPosition.top /= scaleY;

        initPosition.left += left;
        initPosition.top += top;

        getParent();
      }
    } else {
      initPosition = {
        left,
        top,
      };
    }

    return initPosition;
  };

  mergeParentConfig = (
    {
      components,
      path,
      parent,
    }: {
      components: ComponentData.TComponentData[];
      path: string;
      parent?: string;
    },
    callback: (
      components: ComponentData.TComponentData[],
    ) => ComponentData.TComponentData[],
  ) => {
    let parentComponent: ComponentData.TComponentData[] = getParentComponent(
      components,
      path,
    );

    parentComponent = callback(parentComponent);

    if (parent) {
      set(components, getParentPath(path), parentComponent);
      return components;
    } else {
      return parentComponent;
    }
  };

  updateSelectConfig = (
    {
      select,
      components,
    }: {
      select: string[];
      components: ComponentData.TComponentData[];
    },
    callback: (
      config: ComponentData.TComponentData,
      path: string,
    ) => ComponentData.TComponentData,
  ) => {
    // format the sub component position
    const updateComponents: ComponentData.TComponentData[] = select.map(
      (item) => {
        useComponentPath(components);
        const idPathMap = useIdPathMap();

        const targetPath = idPathMap[item];

        const { path } = targetPath;
        const target: ComponentData.TComponentData = get(components, path);

        return callback(target, path);
      },
    );

    return updateComponents;
  };

  deletePrevComponent = (
    component: ComponentData.TComponentData,
    components: ComponentData.TComponentData[],
    path: string,
  ) => {
    const { id } = component;

    const parentPath = getParentPath(path);
    const superParentPath = getParentPath(parentPath);
    const parentComponent = get(components, parentPath);
    const superParentComponent = get(components, superParentPath);

    // outer
    if (!parentPath) {
      components = components.filter((component) => component.id !== id);
    }
    // inner
    else {
      superParentComponent.components = parentComponent.filter(
        (component: any) => component.id !== id,
      );
      set(components, superParentPath, superParentComponent);
    }

    return components;
  };

  // ? 1.5 前版本
  _deleteAndMoveComponent = ({
    select,
    components,
    clickTarget,
    groupComponent,
  }: {
    select: string[];
    components: ComponentData.TComponentData[];
    clickTarget: ComponentData.TComponentData;
    groupComponent: ComponentData.TComponentData;
  }) => {
    let newComponents = [...components];
    let idPathMap!: {
      [key: string]: {
        path: string;
        id: string;
      };
    };

    function update() {
      useComponentPath(newComponents);
      idPathMap = useIdPathMap();
    }

    function formatComponent(component: ComponentData.TComponentData) {
      return mergeWithoutArray({}, component, {
        parent: groupComponent.id,
        config: {
          style: {
            left:
              component.config.style.left - groupComponent.config.style.left,
            top: component.config.style.top - groupComponent.config.style.top,
          },
        },
      });
    }

    const needDealSelect = [...select];
    const targetIdIndex = needDealSelect.indexOf(clickTarget.id);
    needDealSelect.splice(targetIdIndex, 1);

    const needDealListCache: ComponentData.TComponentData[] = [
      formatComponent(clickTarget),
    ];

    needDealSelect.forEach((selectItem) => {
      update();
      const { path } = idPathMap[selectItem];

      needDealListCache.push(formatComponent(get(newComponents, path)));

      newComponents = ComponentUtil.deleteComponent(
        {
          action: 'delete',
          id: selectItem,
          value: {},
          path,
        },
        path,
        getParentPath(path),
        newComponents,
        {},
      );
    });

    groupComponent.components = needDealListCache;

    update();

    const { path } = idPathMap[clickTarget.id];
    set(newComponents, path, groupComponent);

    return newComponents;
  };

  // ? 1.5
  deleteAndMoveComponent = ({
    select,
    components,
    clickTarget,
    groupComponent,
  }: {
    select: string[];
    components: ComponentData.TComponentData[];
    clickTarget: ComponentData.TComponentData;
    groupComponent: ComponentData.TComponentData;
  }) => {
    const actionComponents: ComponentMethod.SetComponentMethodParamsData[] = [];
    let idPathMap: {
      [key: string]: {
        path: string;
        id: string;
      };
    } = useIdPathMap();

    function formatComponent(component: ComponentData.TComponentData) {
      return mergeWithoutArray({}, component, {
        parent: groupComponent.id,
        config: {
          style: {
            left:
              component.config.style.left - groupComponent.config.style.left,
            top: component.config.style.top - groupComponent.config.style.top,
          },
        },
      });
    }

    const needDealSelect = [...select];
    const targetIdIndex = needDealSelect.indexOf(clickTarget.id);
    needDealSelect.splice(targetIdIndex, 1);

    groupComponent.components.push(formatComponent(clickTarget));

    needDealSelect.forEach((selectId) => {
      const { path } = idPathMap[selectId];

      groupComponent.components.push(formatComponent(get(components, path)));

      actionComponents.push({
        value: {},
        id: selectId,
        action: 'delete',
      });
    });

    actionComponents.push({
      value: groupComponent,
      id: clickTarget.id,
      action: 'cover_update',
    });

    return actionComponents;
  };

  // 成组组件的新宽高位置
  generateGroupComponentSizeAndPosition(
    groupComponents: ComponentData.TComponentData[],
    components: ComponentData.TComponentData[],
    calculated: boolean = false,
  ) {
    // 从group中抽出其left和top
    let formatSelectPositionMap: {
      [key: string]: {
        left: number;
        top: number;
      };
    } = {};

    // the component parent limit position
    return groupComponents.reduce(
      (acc, cur) => {
        let left = cur.config.style.left;
        let top = cur.config.style.top;
        if (!calculated) {
          const result = this.getComponentPosition(cur, components);
          left = result.left;
          top = result.top;
        }

        formatSelectPositionMap[cur.id] = {
          left,
          top,
        };

        const {
          config: {
            style: { width, height },
          },
        } = cur;

        if (left < acc.left) acc.left = left;
        if (left + width > acc.right) acc.right = left + width;
        if (top < acc.top) acc.top = top;
        if (top + height > acc.bottom) acc.bottom = top + height;

        return acc;
      },
      {
        left: 99999,
        right: 0,
        top: 99999,
        bottom: 0,
      },
    );
  }

  // 成组
  generateGroupConfig = ({
    select,
    components,
    clickTarget,
    callback,
  }: {
    select: string[];
    components: ComponentData.TComponentData[];
    clickTarget: ComponentData.TComponentData;
    callback?: (id: string) => void;
  }) => {
    const idPathMap = useIdPathMap();
    const { parent } = clickTarget;

    try {
      const { left, top, right, bottom } =
        this.generateGroupComponentSizeAndPosition(
          select.reduce((acc, cur) => {
            const targetPath = idPathMap[cur];
            const { path } = targetPath;
            const target: ComponentData.TComponentData = get(components, path);
            if (target) acc.push(target);
            return acc;
          }, [] as ComponentData.TComponentData[]),
          components,
        );

      // group component
      const newGroupComponent = createGroupComponent({
        parent,
        config: {
          style: {
            left,
            top,
            width: right - left,
            height: bottom - top,
          },
        },
        components: [],
      });

      callback?.(newGroupComponent.id);

      return this.deleteAndMoveComponent({
        select,
        components,
        clickTarget,
        groupComponent: newGroupComponent,
      });
    } catch (err) {
      console.error(err);
    }
  };

  // 取消成组
  splitGroupConfig = ({
    clickTarget,
    components,
    select,
  }: {
    clickTarget: ComponentData.TComponentData;
    components: ComponentData.TComponentData[];
    select: string[];
  }) => {
    const {
      config: {
        style: { left, top },
      },
      id,
      parent,
    } = clickTarget;
    const idPathMap = useIdPathMap();
    const { path } = idPathMap[id] || {};

    // format the sub component position
    const [updateComponents]: ComponentData.TComponentData[] =
      this.updateSelectConfig(
        {
          select,
          components,
        },
        (config) => {
          const {
            components,
            parent,
            config: {
              attr: { scaleX = 1, scaleY = 1 },
            },
          } = config;

          const newConfig = {
            ...config,
            components: components.map((config) => {
              const {
                config: {
                  style: { left: compLeft, top: compTop, width, height },
                  attr: { scaleY: compScaleY = 1, scaleX: compScaleX = 1 },
                },
              } = config;

              const newConfig = mergeWithoutArray(
                {},
                config,
                {
                  config: {
                    style: {
                      left: compLeft * scaleX + left,
                      top: compTop * scaleY + top,
                      width: width * scaleX,
                      height: height * scaleY,
                    },
                  },
                },
                isGroupComponent(config)
                  ? {
                      config: {
                        attr: {
                          scaleY: compScaleY * scaleY,
                          scaleX: compScaleX * scaleX,
                        },
                      },
                    }
                  : {},
              );
              // * avoid undefined
              newConfig.parent = parent;

              return newConfig;
            }),
          };

          return newConfig;
        },
      );

    return this.mergeParentConfig(
      {
        components,
        path,
        parent,
      },
      (parentComponent) => {
        // generate the list
        return [
          ...(parentComponent || components).filter(
            (item) => !select.includes(item.id),
          ),
          ...updateComponents.components,
        ];
      },
    );
  };

  addComponentsToGroup: (
    components: ComponentData.TComponentData[],
    groupComponent: ComponentData.TComponentData,
    addComponents: ComponentData.TComponentData[],
  ) => ComponentMethod.SetComponentMethodParamsData[] = (
    components,
    groupComponent,
    addComponents,
  ) => {
    const { id: originGroupComponentId } = groupComponent;
    const idPathMap = useIdPathMap();

    const originGroupComponentPath = idPathMap[originGroupComponentId].path;
    const path = originGroupComponentPath.split('.')[0];

    const topParentComponent: ComponentData.TComponentData =
      get(components, path) || groupComponent;
    const {
      config: {
        style: { left, top },
      },
    } = topParentComponent;

    const initialAddComponentsPosition =
      this.generateGroupComponentSizeAndPosition(
        addComponents,
        components,
        true,
      );

    let templateAddComponentsPosition = {
      ...initialAddComponentsPosition,
    };

    let calculateScaleX = 1;
    let calculateScaleY = 1;

    let outerLeft = left;
    let outerTop = top;

    const addComponentsDistance = addComponents.map((item) => {
      return {
        left: item.config.style.left - templateAddComponentsPosition.left,
        top: item.config.style.top - templateAddComponentsPosition.top,
      };
    });

    const deepFormat: (
      groupComponent: ComponentData.TComponentData,
      isTop?: boolean,
    ) => ComponentMethod.SetComponentMethodParamsData[] = (
      groupComponent,
      isTop = false,
    ) => {
      let result: ComponentMethod.SetComponentMethodParamsData[] = [];

      const {
        config: {
          style: { left, top, width, height },
          attr: { scaleX = 1, scaleY = 1 },
        },
        id,
        components: groupChildren,
      } = groupComponent;

      const newLeft = Math.min(templateAddComponentsPosition.left, left);
      const newTop = Math.min(templateAddComponentsPosition.top, top);
      const newRight = Math.max(
        left + width,
        templateAddComponentsPosition.right,
      );
      const newBottom = Math.max(
        top + height,
        templateAddComponentsPosition.bottom,
      );
      const newWidth = newRight - newLeft;
      const newHeight = newBottom - newTop;

      if (isTop) {
        outerLeft = newLeft;
        outerTop = newTop;
      }

      const tempAddComponentWidth =
        (templateAddComponentsPosition.right -
          templateAddComponentsPosition.left) /
        scaleX;
      const tempAddComponentHeight =
        (templateAddComponentsPosition.bottom -
          templateAddComponentsPosition.top) /
        scaleY;

      const changeLeft = left - newLeft;
      const changeTop = top - newTop;

      const newTempAddComponentLeft =
        (templateAddComponentsPosition.left - newLeft) / scaleX;
      const newTempAddComponentTop =
        (templateAddComponentsPosition.top - newTop) / scaleY;

      calculateScaleX *= scaleX;
      calculateScaleY *= scaleY;

      templateAddComponentsPosition = {
        left: newTempAddComponentLeft,
        top: newTempAddComponentTop,
        right: newTempAddComponentLeft + tempAddComponentWidth,
        bottom: newTempAddComponentTop + tempAddComponentHeight,
      };

      const isConfigChanged =
        !!changeLeft ||
        !!changeTop ||
        newWidth !== width ||
        newHeight !== height;

      // 更改当前组
      isConfigChanged &&
        result.push(
          // 非目标组
          {
            action: 'update',
            id,
            value: {
              config: {
                style: {
                  width: newWidth,
                  height: newHeight,
                  left: newLeft,
                  top: newTop,
                },
              },
            },
          },
        );

      // 当前组下的子组件
      result.push(
        ...groupChildren.reduce<any>((acc, item) => {
          // 未改变且为组件
          if (!isConfigChanged && !isGroupComponent(item)) return acc;

          const path = idPathMap[item.id].path;

          // 改变了且为组件
          if (
            (!isGroupComponent(item) ||
              !originGroupComponentPath.startsWith(path)) &&
            isConfigChanged
          ) {
            acc.push({
              action: 'update' as any,
              id: item.id,
              value: {
                config: {
                  style: {
                    left: item.config.style.left + changeLeft,
                    top: item.config.style.top + changeTop,
                  },
                },
              },
            });
          } else {
            acc.push(
              ...deepFormat(
                merge({}, item, {
                  config: {
                    style: {
                      left: item.config.style.left + changeLeft,
                      top: item.config.style.top + changeTop,
                    },
                  },
                }),
                false,
              ),
            );
          }

          return acc;
        }, []),
      );

      // 目标组
      if (originGroupComponentId === id) {
        const path = idPathMap[id].path;

        result.push(
          ...addComponents.map((item, index) => {
            return {
              value: merge({}, item, {
                parent: id,
                config: {
                  style: {
                    left:
                      addComponentsDistance[index].left / calculateScaleX +
                      newTempAddComponentLeft,
                    top:
                      addComponentsDistance[index].top / calculateScaleY +
                      newTempAddComponentTop,
                    width: item.config.style.width / calculateScaleX,
                    height: item.config.style.height / calculateScaleY,
                  },
                },
              }),
              id: item.id,
              path: path + '.components',
              action: 'add' as any,
            };
          }),
        );
      }

      return result;
    };

    return deepFormat(topParentComponent, true);
  };

  // 添加组件到组中
  _addComponentsToGroup: (
    components: ComponentData.TComponentData[],
    groupComponent: ComponentData.TComponentData,
    addComponents: ComponentData.TComponentData[],
  ) => ComponentMethod.SetComponentMethodParamsData[] = (
    components,
    groupComponent,
    addComponents,
  ) => {
    const { left: outerLeft, top: outerTop } = this.getComponentPosition(
      groupComponent,
      components,
    );
    const {
      config: {
        style: { left, top, width, height },
        attr: { scaleX = 1, scaleY = 1 },
      },
      id,
      parent,
    } = groupComponent;

    const {
      left: calLeft,
      top: calTop,
      right: calRight,
      bottom: calBottom,
    } = this.generateGroupComponentSizeAndPosition(
      addComponents,
      components,
      true,
    );

    const newLeft = Math.min(outerLeft, calLeft);
    const newTop = Math.min(outerTop, calTop);
    const newRight = Math.max(outerLeft + width, calRight);
    const newBottom = Math.max(outerTop + height, calBottom);
    const newWidth = newRight - newLeft;
    const newHeight = newBottom - newTop;
    const deltaLeft = outerLeft - newLeft;
    const deltaTop = outerTop - newTop;

    const idPathMap = useIdPathMap();

    const path = idPathMap[id].path;

    const parentUpdate = parent
      ? this.addComponentsToGroup(
          components,
          getParentComponent(components, getParentPath(path)),
          [
            merge({}, groupComponent, {
              config: {
                style: {
                  left: outerLeft - deltaLeft,
                  top: outerTop - deltaTop,
                  width: newWidth,
                  height: newHeight,
                },
              },
            }) as ComponentData.TComponentData,
          ],
        )
      : [];

    return [
      // 组内组件
      ...(newLeft !== outerLeft || newTop !== outerTop
        ? groupComponent.components.map((item) => {
            return {
              action: 'update',
              id: item.id,
              value: {
                config: {
                  style: {
                    left: item.config.style.left + deltaLeft,
                    top: item.config.style.top + deltaTop,
                  },
                },
              },
            };
          })
        : []),
      // 新增的组内组件
      // 嵌套递归的组内组件不需要了
      ...addComponents.map((item, index) => {
        return {
          value: merge({}, item, {
            parent: id,
            config: {
              style: {
                left: (item.config.style.left - newLeft) / scaleX,
                top: (item.config.style.top - newTop) / scaleY,
                width: item.config.style.width / scaleX,
                height: item.config.style.height / scaleY,
              },
            },
          }),
          id: item.id,
          path: path + '.components',
          action: 'add' as any,
        };
      }),
      // 修改当前组
      {
        value: {
          config: {
            style: {
              left: outerLeft - deltaLeft,
              top: outerTop - deltaTop,
              width: newWidth,
              height: newHeight,
            },
          },
        },
        action: 'update',
        id: groupComponent.id,
      },
      // 组的上级
      ...parentUpdate,
    ] as ComponentMethod.SetComponentMethodParamsData[];
  };
}

export default new GroupUtil();
