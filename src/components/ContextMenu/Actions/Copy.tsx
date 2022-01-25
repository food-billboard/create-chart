import { useCallback } from 'react';
import { CommonActionType } from './type';

export const copy = (
  select: string[],
  setClipboard: (value: string[]) => void,
) => {
  setClipboard(select);
};

const CopyAction = (props: CommonActionType) => {
  const { select, setClipboard, onClick } = props;

  const handleClick = useCallback(() => {
    copy(select, setClipboard);
    onClick?.();
  }, [setClipboard, select, onClick]);

  return (
    <div key="copy" onClick={handleClick}>
      复制
    </div>
  );
};

export default CopyAction;
