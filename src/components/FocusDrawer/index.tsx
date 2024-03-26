import { useUpdateEffect } from 'ahooks';
import { Drawer } from 'antd';
import type { DrawerProps as AntDrawerProps } from 'antd';
import CopyAndPasteUtil from '@/utils/Assist/CopyAndPaste';
import { ContentLoading } from '../PageLoading';

export type DrawerProps = AntDrawerProps & {
  loading?: boolean;
};

const FocusDrawer = (props: DrawerProps) => {
  const { open, children, loading = false, ...nextProps } = props;

  useUpdateEffect(() => {
    if (open) {
      CopyAndPasteUtil.forceFocus();
    } else {
      CopyAndPasteUtil.forceUnFocus();
    }
  }, [open]);

  return (
    <Drawer {...nextProps} open={open}>
      {loading ? <ContentLoading loading /> : children}
    </Drawer>
  );
};

export default FocusDrawer;
