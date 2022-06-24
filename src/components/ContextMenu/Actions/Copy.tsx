import { useCallback } from 'react';
import { CopyOutlined } from '@ant-design/icons';
import DataChangePool from '@/utils/Assist/DataChangePool';
import { paste, useIsValidPasteSelect } from './Paste';
import { CommonActionType } from './type';

export const copy = (pasteParams: {
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
  paste(pasteParams);
};

const CopyAction = (props: CommonActionType) => {
  const { select, setClipboard, onClick, value, components, setSelect } = props;
  const { parent } = value;

  const isValidPasteSelect = useIsValidPasteSelect({
    select,
    parent,
    components,
  });

  const handleClick = useCallback(
    (e: any) => {
      e?.stopPropagation();

      copy({
        components,
        setComponent: (_, newComponents) => {
          DataChangePool.setComponent(
            newComponents.map((item) => {
              return {
                value: item,
                id: item.id,
                action: 'add',
              };
            }),
          );
        },
        setSelect,
        clipboard: select,
        sourceComponents: components,
      });

      onClick?.();
    },
    [setClipboard, select, onClick, setSelect, components],
  );

  return (
    <div
      key="copy"
      onClick={handleClick}
      style={{
        display: isValidPasteSelect ? 'block' : 'none',
      }}
    >
      <CopyOutlined className="m-r-4" />
      复制
    </div>
  );
};

export default CopyAction;
