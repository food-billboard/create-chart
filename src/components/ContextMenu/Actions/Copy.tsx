import { useCallback } from 'react';
import { AppstoreAddOutlined } from '@ant-design/icons';
import { paste, useIsValidPasteSelect, pasteClick } from './Paste';
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

  return (
    <div
      key="copy"
      onClick={handleClick}
      style={{
        display: isValidPasteSelect ? 'block' : 'none',
      }}
    >
      <AppstoreAddOutlined className="m-r-4" />
      复制
    </div>
  );
};

export default CopyAction;
