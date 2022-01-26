import { useCallback, useMemo } from 'react';
import { get } from 'lodash';
import { useIdPathMap } from '@/hooks/useComponentsPath';
import {
  createComponent,
  getParentComponent,
  getParentPath,
  isGroupComponent as isGroupComponentMethod,
} from '@/utils/Assist/Component';
import { CommonActionType } from './type';

function coverPreviousId(
  component: ComponentData.TComponentData,
  parent: string = '',
): ComponentData.TComponentData {
  const newComponent = createComponent({
    ...component,
    parent,
    // copy and paste
    name: component.name + '_副本',
  });

  if (isGroupComponentMethod(newComponent)) {
    return {
      ...newComponent,
      components: newComponent.components.map((component) => {
        return coverPreviousId(component, newComponent.id);
      }),
    };
  }

  return newComponent;
}

export const paste = ({
  sourceComponents,
  components,
  clipboard,
  setComponentAll,
  setSelect,
  parent = '',
}: {
  sourceComponents: ComponentData.TComponentData[];
  components: ComponentData.TComponentData[];
  clipboard: string[];
  setComponentAll: (components: ComponentData.TComponentData[]) => void;
  setSelect: (value: string[]) => void;
  parent?: string;
}) => {
  const idPathMap = useIdPathMap();
  const newSelect: string[] = [];

  const newComponents = [
    ...components,
    ...clipboard.reduce<ComponentData.TComponentData[]>((acc, cur) => {
      const targetPath = idPathMap[cur];
      if (!targetPath) return acc;
      const component = get(sourceComponents, targetPath.path);
      if (!component) return acc;
      const newComponent = coverPreviousId(component, parent);
      newSelect.push(newComponent.id);
      acc.push(newComponent);
      return acc;
    }, []),
  ];

  setComponentAll(newComponents);
  setSelect(newSelect);
};

const PasteAction = (props: CommonActionType) => {
  const {
    onClick,
    select,
    setClipboard,
    components,
    value,
    setSelect,
    clipboard,
    setComponentAll,
    path,
    setComponent,
  } = props;
  const { parent, type, components: currentComponents, id } = value;

  const isValidPasteSelect = useMemo(() => {
    const idPathMap = useIdPathMap();
    return select.every((componentId) => {
      const target = idPathMap[componentId];
      if (!target) return false;
      const targetComponent: ComponentData.TComponentData = get(
        components,
        target.path,
      );
      if (!targetComponent) return false;
      return true;
      return targetComponent.parent === parent;
    });
  }, [select, parent, components]);

  const isGroupComponent = () => {
    return isGroupComponentMethod({ type });
  };

  const handleClick = useCallback(() => {
    const parentPath = getParentPath(path);
    const superParentPath = getParentPath(parentPath);
    const parentComponent = getParentComponent(components, path);
    const superParentComponent = getParentComponent(components, parentPath);
    let parentId: string | undefined = '';

    const isGroupComponentClick = isGroupComponent();

    // click croup component or component
    let targetParentComponents;
    if (isGroupComponentClick) {
      targetParentComponents = currentComponents;
      parentId = id;
    } else {
      targetParentComponents = parentComponent;
      parentId = parent;
    }

    paste({
      setSelect,
      components: targetParentComponents || components,
      setComponentAll: (newComponents) => {
        // group component
        if (isGroupComponentClick) {
          setComponent({
            path,
            action: 'update',
            id,
            value: {
              components: newComponents.map((item) => ({
                ...item,
                parent: id,
              })),
            },
          });
        }
        // inner component
        else if (parentComponent) {
          setComponent({
            path: superParentPath,
            action: 'update',
            id: superParentComponent.id,
            value: {
              components: newComponents.map((item) => ({
                ...item,
                parent: superParentComponent.id,
              })),
            },
          });
        }
        // outer component
        else {
          setComponentAll(newComponents);
        }
      },
      clipboard,
      sourceComponents: components,
      parent: parentId,
    });
    onClick?.();
  }, [
    currentComponents,
    id,
    setClipboard,
    clipboard,
    components,
    onClick,
    setSelect,
    path,
    setComponentAll,
    setComponent,
    type,
    parent,
  ]);

  return (
    <div
      key="copy"
      onClick={handleClick}
      style={{
        display: isValidPasteSelect ? 'block' : 'none',
      }}
    >
      粘贴
    </div>
  );
};

export default PasteAction;
