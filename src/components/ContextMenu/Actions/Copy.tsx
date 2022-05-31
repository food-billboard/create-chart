import { useCallback } from 'react';
import { CopyOutlined } from '@ant-design/icons';
import { CommonActionType } from './type';

export const copy = (
  select: string[],
  setClipboard: (value: string[]) => void,
) => {
  setClipboard(select);
};

const CopyAction = (props: CommonActionType) => {
  const { select, setClipboard, onClick } = props;

  const handleClick = useCallback(
    (e: any) => {
      e?.stopPropagation();
      copy(select, setClipboard);
      onClick?.();
    },
    [setClipboard, select, onClick],
  );

  return (
    <div key="copy" onClick={handleClick}>
      <CopyOutlined className="m-r-4" />
      复制
    </div>
  );
};

export default CopyAction;
