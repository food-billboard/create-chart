import { useState } from 'react';
import CopyAndPasteUtil from '@/utils/Assist/CopyAndPaste';
import { useUpdateEffect } from 'ahooks';

// 针对在使用弹窗的情况下，处理键盘点击的情景

export function useControlDisableKeyPressVisible(
  initialState: boolean | (() => boolean) = false,
): [boolean, (value: boolean | ((prev: boolean) => boolean)) => void] {
  const [visible, setVisible] = useState<boolean>(initialState);

  useUpdateEffect(() => {
    if (visible) {
      CopyAndPasteUtil.forceFocus();
    } else {
      CopyAndPasteUtil.forceUnFocus();
    }
  }, [visible]);

  return [visible, setVisible];
}
