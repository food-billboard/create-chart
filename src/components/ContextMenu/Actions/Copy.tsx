import { useCallback } from 'react';
import { AppstoreAddOutlined } from '@ant-design/icons';
import { paste, useIsValidPasteSelect, pasteClick } from './Paste';
import useChildren from './useChildren';
import { CommonActionType } from './type';

export const copy = (pasteParams: {
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
  paste(pasteParams);
};

const CopyAction = (props: CommonActionType) => {
  const {
    select,
    setClipboard,
    onClick,
    value,
    components,
    setSelect,
    actionFrom,
    path,
    setComponent,
    childrenType,
    disabled,
  } = props;
  const { parent, id, components: currentComponents, type } = value;

  const isValidPasteSelect = useIsValidPasteSelect({
    select,
    parent,
    components,
  });

  const handleClick = useCallback(
    (e: any) => {
      e?.stopPropagation();

      return pasteClick({
        currentComponents,
        id,
        setClipboard,
        clipboard: {
          value: select,
          timestamps: Date.now(),
        },
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
      setClipboard,
      select,
      onClick,
      setSelect,
      components,
      id,
      path,
      setComponent,
      type,
    ],
  );

  const children = useChildren(childrenType, {
    title: '复制',
    icon: <AppstoreAddOutlined />,
    key: 'copy',
    onClick: handleClick,
    disabled,
    style: isValidPasteSelect ? {} : { display: 'none' },
  });

  return children;
};

export default CopyAction;
