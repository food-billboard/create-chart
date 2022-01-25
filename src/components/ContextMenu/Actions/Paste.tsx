import { useCallback, useMemo } from 'react';
import { get } from 'lodash';
import { useIdPathMap } from '@/hooks/useComponentsPath';
import {
  createComponent,
  getParentComponent,
  getParentPath,
} from '@/utils/Assist/Component';
import { EComponentType } from '@/utils';
import { CommonActionType } from './type';

export const paste = ({
  sourceComponents,
  components,
  clipboard,
  setComponentAll,
  setSelect,
}: {
  sourceComponents: ComponentData.TComponentData[];
  components: ComponentData.TComponentData[];
  clipboard: string[];
  setComponentAll: (components: ComponentData.TComponentData[]) => void;
  setSelect: (value: string[]) => void;
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
      const newComponents = createComponent({
        ...component,
        // copy and paste
        name: component.name + '_副本',
      });
      newSelect.push(newComponents.id);
      acc.push(newComponents);
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
      return targetComponent.parent === parent;
    });
  }, [select, parent, components]);

  const isGroupComponent = () => {
    return EComponentType.GROUP_COMPONENT === type;
  };

  const handleClick = useCallback(() => {
    const parentPath = getParentPath(path);
    const superParentPath = getParentPath(parentPath);
    const parentComponent = getParentComponent(components, path);
    const superParentComponent = getParentComponent(components, parentPath);

    const isGroupComponentClick = isGroupComponent();

    // click croup component or component
    let targetParentComponents;
    if (isGroupComponentClick) {
      targetParentComponents = currentComponents;
    } else {
      targetParentComponents = parentComponent;
    }

    paste({
      setSelect,
      components: targetParentComponents || components,
      setComponentAll: (newComponents) => {
        // group component
        if (isGroupComponentClick) {
          setComponent({
            path: path,
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
