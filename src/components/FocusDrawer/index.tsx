import { useUpdateEffect } from 'ahooks';
import { Drawer } from 'antd';
import type { DrawerProps } from 'antd';
import CopyAndPasteUtil from '@/utils/Assist/CopyAndPaste';

const FocusDrawer = (props: DrawerProps) => {
  const { open } = props;

  useUpdateEffect(() => {
    if (open) {
      CopyAndPasteUtil.forceFocus();
    } else {
      CopyAndPasteUtil.forceUnFocus();
    }
  }, [open]);

  return <Drawer {...props} />;
};

export default FocusDrawer;
