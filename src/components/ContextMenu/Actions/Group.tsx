import { useCallback, useMemo } from 'react';
import { get, set } from 'lodash';
import { useIdPathMap } from '@/hooks';
import { EComponentType } from '@/utils/constants';
import {
  createGroupComponent,
  getParentPath,
  getParentComponent,
} from '@/utils/Assist/Component';
import { mergeWithoutArray } from '@/utils/tool';
import { CommonActionType } from './type';

const GroupAction = (props: CommonActionType) => {
  const { value, path, setComponentAll, components, select, onClick } = props;
  const { id, type, parent, components: children, config } = value;

  const isGroup = useMemo(() => {
    // * 选中多个的情况下，统一显示成组
    return EComponentType.GROUP_COMPONENT === type && select.length === 1;
  }, [type, select]);

  const title = useMemo(() => {
    return isGroup ? '取消成组' : '成组';
  }, [isGroup]);

  const isValidGroupSelect = useMemo(() => {
    const idPathMap = useIdPathMap();
    return select.every((componentId) => {
      const target = idPathMap[componentId];
      if (!target) return false;
      const targetComponent: ComponentData.TComponentData = get(
        components,
        target.path,
      );
      if (!targetComponent) return false;
      return targetComponent.parent === parent;
    });
  }, [select, parent, components]);

  const updateSelectConfig = useCallback(
    (
      callback: (
        config: ComponentData.TComponentData,
      ) => ComponentData.TComponentData,
    ) => {
      const idPathMap = useIdPathMap();

      // format the sub component position
      const updateComponents: ComponentData.TComponentData[] = select.map(
        (item) => {
          const targetPath = idPathMap[item];

          const { path } = targetPath;
          const target: ComponentData.TComponentData = get(components, path);

          return callback(target);
        },
      );

      return updateComponents;
    },
    [select, components, path],
  );

  const mergeParentConfig = useCallback(
    (
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
    },
    [],
  );

  const generateGroupConfig = useCallback(() => {
    const idPathMap = useIdPathMap();

    try {
      // the component parent limit position
      const { left, top, right, bottom } = select.reduce(
        (acc, cur) => {
          const targetPath = idPathMap[cur];

          const { path } = targetPath;
          const target: ComponentData.TComponentData = get(components, path);

          const {
            config: {
              style: { left, top, width, height },
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

      return mergeParentConfig((parentComponent) => {
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

        // format the sub component position
        const updateComponents: ComponentData.TComponentData[] =
          updateSelectConfig((config) => {
            const {
              config: {
                style: { left: compLeft, top: compTop },
              },
            } = config;

            return mergeWithoutArray({}, config, {
              config: {
                style: {
                  left: compLeft - left,
                  top: compTop - top,
                },
              },
              parent: newGroupComponent.id,
            });
          });

        // generate the list
        return [
          ...(parentComponent || components).filter(
            (item) => !select.includes(item.id),
          ),
          {
            ...newGroupComponent,
            components: updateComponents,
          },
        ];
      });
    } catch (err) {
      console.error(err);
    }
  }, [select, components, path, parent]);

  const splitGroupConfig = useCallback(() => {
    const {
      style: { left, top },
    } = config;

    // format the sub component position
    const [updateComponents]: ComponentData.TComponentData[] =
      updateSelectConfig((config) => {
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
      });

    return mergeParentConfig((parentComponent) => {
      // generate the list
      return [
        ...(parentComponent || components).filter(
          (item) => !select.includes(item.id),
        ),
        ...updateComponents.components,
      ];
    });
  }, [select, components, path, parent, children, config]);

  const handleClick = useCallback(
    (e: any) => {
      e.stopPropagation();

      if (isGroup) {
        const newComponents = splitGroupConfig();
        newComponents && setComponentAll(newComponents);
      } else {
        const newComponents = generateGroupConfig();
        newComponents && setComponentAll(newComponents);
      }
      onClick();
    },
    [
      isGroup,
      id,
      path,
      components,
      setComponentAll,
      select,
      onClick,
      generateGroupConfig,
    ],
  );

  return (
    <div
      key="group"
      onClick={handleClick}
      style={{
        display: isValidGroupSelect ? 'block' : 'none',
      }}
    >
      {title}
    </div>
  );
};

export default GroupAction;
