import { get, set } from 'lodash';
import { useIdPathMap, useComponentPath } from '@/hooks';
import ComponentUtil, {
  getParentComponent,
  getParentPath,
  createGroupComponent,
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
          },
        } = parentComponent as ComponentData.TComponentData;

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

  generateGroupConfig = ({
    select,
    components,
    clickTarget,
  }: {
    select: string[];
    components: ComponentData.TComponentData[];
    clickTarget: ComponentData.TComponentData;
  }) => {
    const idPathMap = useIdPathMap();
    const { parent, id } = clickTarget;
    const { path } = idPathMap[id] || {};

    // 从group中抽出其left和top
    let formatSelectPositionMap: {
      [key: string]: {
        left: number;
        top: number;
      };
    } = {};

    try {
      // the component parent limit position
      const { left, top, right, bottom } = select.reduce(
        (acc, cur) => {
          const targetPath = idPathMap[cur];

          const { path } = targetPath;
          const target: ComponentData.TComponentData = get(components, path);

          const { left, top } = this.getComponentPosition(target, components);

          formatSelectPositionMap[target.id] = {
            left,
            top,
          };

          const {
            config: {
              style: { width, height },
            },
          } = target;

          if (left < acc.left) acc.left = left;
          if (left + width > acc.right) acc.right = left + width;
          if (top < acc.top) acc.top = top;
          if (top + height) acc.bottom = top + height;

          return acc;
        },
        {
          left: 99999,
          right: 0,
          top: 99999,
          bottom: 0,
        },
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
      });

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
          const { components, parent } = config;

          const newConfig = {
            ...config,
            components: components.map((config) => {
              const {
                config: {
                  style: { left: compLeft, top: compTop },
                },
              } = config;

              const newConfig = mergeWithoutArray({}, config, {
                config: {
                  style: {
                    left: compLeft + left,
                    top: compTop + top,
                  },
                },
              });
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
}

export default new GroupUtil();
