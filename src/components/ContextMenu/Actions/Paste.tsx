import { useCallback, useMemo } from 'react';
import { get, pick } from 'lodash';
import { SnippetsOutlined } from '@ant-design/icons';
import { useIdPathMap } from '@/hooks/useComponentsPath';
import {
  createComponent,
  getParentComponent,
  getParentPath,
  isGroupComponent as isGroupComponentMethod,
} from '@/utils/Assist/Component';
import GroupUtil from '@/utils/Assist/Group';
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
  setComponent,
  setSelect,
  parent = '',
}: {
  sourceComponents: ComponentData.TComponentData[];
  components: ComponentData.TComponentData[];
  clipboard: string[];
  setComponent: (
    components: ComponentData.TComponentData[],
    generateComponents: ComponentData.TComponentData[],
  ) => void;
  setSelect: (value: string[]) => void;
  parent?: string;
}) => {
  const idPathMap = useIdPathMap();
  const newSelect: string[] = [];

  let generateComponents: ComponentData.TComponentData[] = [];

  const newComponents = [
    ...components,
    ...clipboard.reduce<ComponentData.TComponentData[]>((acc, cur) => {
      const targetPath = idPathMap[cur];
      if (!targetPath) return acc;
      const component = get(sourceComponents, targetPath.path);
      if (!component) return acc;

      // 修改组件的id
      const newComponent = coverPreviousId(component, parent);
      // 修改组件的实际位置，可能存在组件在组中
      const formatComponentPosition = GroupUtil.getComponentPosition(
        component,
        sourceComponents,
      );
      newComponent.config.style = {
        ...newComponent.config.style,
        ...pick(
          formatComponentPosition || {},
          'left',
          'top',
          'width',
          'height',
        ),
      };
      newSelect.push(newComponent.id);
      acc.push(newComponent);
      generateComponents.push(newComponent);
      return acc;
    }, []),
  ];

  setComponent(newComponents, generateComponents);

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

  const handleClick = useCallback(
    (e: any) => {
      e?.stopPropagation();
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

      const realComponents = targetParentComponents || components;

      paste({
        setSelect,
        components: realComponents,
        setComponent: (newComponents, generateComponents) => {
          // group component or inner component
          if (isGroupComponentClick || parentComponent) {
            setComponent(
              GroupUtil.addComponentsToGroup(
                components,
                superParentComponent,
                generateComponents,
              ),
            );
          }
          // outer component
          else {
            setComponent(
              generateComponents.map((item) => {
                return {
                  value: item,
                  id: item.id,
                  action: 'add',
                };
              }),
            );
          }
        },
        clipboard,
        sourceComponents: components,
        parent: parentId,
      });
      onClick?.();
    },
    [
      currentComponents,
      id,
      setClipboard,
      clipboard,
      components,
      onClick,
      setSelect,
      path,
      setComponent,
      type,
      parent,
      value,
    ],
  );

  return (
    <div
      key="paste"
      onClick={handleClick}
      style={{
        display: isValidPasteSelect ? 'block' : 'none',
      }}
    >
      <SnippetsOutlined className="m-r-4" />
      粘贴
    </div>
  );
};

export default PasteAction;
