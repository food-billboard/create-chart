import { useCallback, useMemo } from 'react';
import { get } from 'lodash';
import { SnippetsOutlined } from '@ant-design/icons';
import { useIdPathMap } from '@/hooks/useComponentsPath';
import {
  createComponent,
  getParentComponent,
  getParentPath,
  isGroupComponent as isGroupComponentMethod,
} from '@/utils/Assist/Component';
import GroupUtil from '@/utils/Assist/Group';
import ClipboardComponent from '@/utils/Assist/ClipboardComponent';
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

export function useIsValidPasteSelect({
  select,
  parent,
  components,
}: {
  select: string[];
  parent?: string;
  components: ComponentData.TComponentData[];
}) {
  return useMemo(() => {
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
}

export const paste = async ({
  sourceComponents,
  components,
  clipboard,
  setComponent,
  setSelect,
  parent = '',
}: {
  sourceComponents: ComponentData.TComponentData[];
  components: ComponentData.TComponentData[];
  clipboard: ComponentClipboard.LocalClipboardType;
  setComponent: (
    components: ComponentData.TComponentData[],
    generateComponents: ComponentData.TComponentData[],
  ) => void;
  setSelect: (value: string[]) => void;
  parent?: string;
}) => {
  const newSelect: string[] = [];

  const { clipboardComponents: realClipboard, isStorage } =
    await ClipboardComponent.getRealComponentClipboard(clipboard);

  if (!realClipboard.length) return;

  let generateComponents: ComponentData.TComponentData[] = [];

  const newComponents = [
    ...components,
    ...realClipboard.reduce<ComponentData.TComponentData[]>(
      (acc, component) => {
        // 修改组件的id
        const newComponent: ComponentData.TComponentData = coverPreviousId(
          component,
          parent,
        );

        newSelect.push(newComponent.id);
        acc.push(newComponent);
        generateComponents.push(newComponent);
        return acc;
      },
      [],
    ),
  ];

  setComponent(newComponents, generateComponents);

  setSelect(newSelect);
};

// 只用在了这里和复制
export const pasteClick = async ({
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
  actionFrom,
}: {
  id: string;
  type: any;
  parent?: string;
  currentComponents: ComponentData.TComponentData[];
} & Pick<
  CommonActionType,
  | 'setClipboard'
  | 'clipboard'
  | 'components'
  | 'onClick'
  | 'setSelect'
  | 'path'
  | 'setComponent'
  | 'value'
  | 'actionFrom'
>) => {
  const parentPath = getParentPath(path);
  const parentComponent = getParentComponent(components, path);
  const superParentComponent = getParentComponent(components, parentPath);
  let parentId: string | undefined = '';
  let realComponents = [...components];
  let isGroupComponentClick = false;
  let isOuterClick = actionFrom === 'screen';

  if (!isOuterClick) {
    isGroupComponentClick = isGroupComponentMethod({ type });

    // click croup component or component
    let targetParentComponents;
    if (isGroupComponentClick) {
      targetParentComponents = currentComponents;
      parentId = id;
    } else {
      targetParentComponents = parentComponent;
      parentId = parent;
    }

    realComponents = targetParentComponents || components;
  }

  // 如果是大屏中点击就是最外层的点击
  isOuterClick = isOuterClick || (!isGroupComponentClick && !parentComponent);

  await paste({
    setSelect,
    components: realComponents,
    setComponent: (newComponents, generateComponents) => {
      // group component or inner component
      if (!isOuterClick) {
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
    actionFrom,
  } = props;
  const { parent, type, components: currentComponents, id } = value;

  const isValidPasteSelect = useIsValidPasteSelect({
    select,
    parent,
    components,
  });

  const isGroupComponent = () => {
    return isGroupComponentMethod({ type });
  };

  const handleClick = useCallback(
    (e: any) => {
      e?.stopPropagation();
      return pasteClick({
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
        actionFrom,
      });
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
      actionFrom,
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
