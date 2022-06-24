import { useCallback } from 'react';
import { CopyOutlined } from '@ant-design/icons';
import { CommonActionType } from './type';

export const clone = (
  select: string[],
  setClipboard: (value: string[]) => void,
) => {
  setClipboard(select);
};

const CloneAction = (props: CommonActionType) => {
  const { select, setClipboard, onClick } = props;

  const handleClick = useCallback(
    (e: any) => {
      e?.stopPropagation();
      clone(select, setClipboard);
      onClick?.();
    },
    [setClipboard, select, onClick],
  );

  return (
    <div key="clone" onClick={handleClick}>
      <CopyOutlined className="m-r-4" />
      拷贝
    </div>
  );
};

export default CloneAction;
