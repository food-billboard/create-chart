import { get, set, merge, pick } from 'lodash';
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
        style: { left, top, width, height },
        attr: { scaleX = 1, scaleY = 1 },
      },
    } = value;
    const targetPath = idPathMap[id];
    const { path } = targetPath;
    let initPosition = {
      left,
      top,
      width,
      height,
      scaleX,
      scaleY,
    };

    if (parent) {
      let parentPath: string = path;
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

        initPosition.left = initPosition.left * scaleX + left;
        initPosition.top = initPosition.top * scaleY + top;

        initPosition.width *= scaleX;
        initPosition.height *= scaleY;

        initPosition.scaleX *= scaleX;
        initPosition.scaleY *= scaleY;

        getParent();
      }
    } else {
      initPosition = {
        left,
        top,
        width,
        height,
        scaleX,
        scaleY,
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
        width: number;
        height: number;
      };
    } = {};

    // the component parent limit position
    return groupComponents.reduce(
      (acc, cur) => {
        let left = cur.config.style.left;
        let top = cur.config.style.top;
        let width = cur.config.style.width;
        let height = cur.config.style.height;
        if (!calculated) {
          const result = this.getComponentPosition(cur, components);
          left = result.left;
          top = result.top;
          width = result.width;
          height = result.height;
        }

        formatSelectPositionMap[cur.id] = {
          left,
          top,
          width,
          height,
        };

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

  // 成组1.5
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

    const path = idPathMap[parent as string].path;
    const parentComponent = get(components, path);

    const addComponents: ComponentData.TComponentData[] = select.map((item) => {
      const path = idPathMap[item].path;
      const component = get(components, path);
      const formatComponentPosition = this.getComponentPosition(
        component,
        components,
      );
      const newComponents = merge({}, component, {
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
      return newComponents;
    });

    const result = this.addComponentsToGroup(
      components,
      parentComponent,
      addComponents,
    );
    // 实际更改
    let realResult: ComponentMethod.SetComponentMethodParamsData[] = [];
    // 新增的组件 即需要成组的组件
    let addResult: ComponentMethod.SetComponentMethodParamsData[] = [];
    result.forEach((actionItem) => {
      const { action, id } = actionItem;
      if (action === 'add') {
        addResult.push(actionItem);
      } else if (action === 'update') {
        if (id !== clickTarget.id) {
          realResult.push(actionItem);
        }
      }
    });

    const {
      left: groupComponentLeft,
      top: groupComponentTop,
      right,
      bottom,
    } = this.generateGroupComponentSizeAndPosition(
      addResult.map((item) => {
        return {
          config: {
            style: {
              left: item.value.config?.style?.left || 0,
              top: item.value.config?.style?.top || 0,
              width: item.value.config?.style?.width || 0,
              height: item.value.config?.style?.height || 0,
            },
          },
        };
      }) as any,
      [],
      true,
    );
    // 创建新组
    const newGroupComponent = createGroupComponent({
      parent: parentComponent.id,
      config: {
        style: {
          left: groupComponentLeft,
          top: groupComponentTop,
          width: right - groupComponentLeft,
          height: bottom - groupComponentTop,
        },
      },
      components: [],
    });
    newGroupComponent.components = addResult.map((item) => {
      return merge({}, item.value, {
        parent: newGroupComponent.id,
        config: {
          style: {
            left: item.value.config?.style?.left || 0 - groupComponentLeft,
            top: item.value.config?.style?.top || 0 - groupComponentTop,
          },
        },
      });
    });

    realResult.push(
      {
        action: 'cover_update',
        id: clickTarget.id,
        value: newGroupComponent,
      },
      ...(addComponents
        .filter((item) => item.id !== clickTarget.id)
        .map((item) => {
          return {
            action: 'delete',
            value: {},
            id: item.id,
          };
        }) as any),
    );

    callback?.(newGroupComponent.id);

    return realResult;
  };

  // 成组
  _generateGroupConfig = ({
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

      let scaleX = 1;
      let scaleY = 1;
      let realLeft = left;
      let realTop = top;
      let realWidth = right - left;
      let realHeight = bottom - top;

      if (parent) {
        const path = idPathMap[parent].path;
        const parentComponent = get(components, path);
        const {
          left,
          top,
          width,
          height,
          scaleX: parentScaleX,
          scaleY: parentScaleY,
        } = this.getComponentPosition(parentComponent, components);
        scaleX = parentScaleX;
        scaleY = parentScaleY;
        realLeft -= left;
        realTop -= top;
      }

      realWidth /= scaleX;
      realHeight /= scaleY;
      realLeft /= scaleX;
      realTop /= scaleY;

      // group component
      const newGroupComponent = createGroupComponent({
        parent,
        config: {
          style: {
            left: realLeft,
            top: realTop,
            width: realWidth,
            height: realHeight,
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

  // 粘贴组件
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

    const addComponentsDistance = addComponents.map((item) => {
      return {
        left: item.config.style.left - templateAddComponentsPosition.left,
        top: item.config.style.top - templateAddComponentsPosition.top,
      };
    });

    const deepFormat: (
      groupComponent: ComponentData.TComponentData,
    ) => ComponentMethod.SetComponentMethodParamsData[] = (groupComponent) => {
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

    return deepFormat(topParentComponent);
  };
}

export default new GroupUtil();
