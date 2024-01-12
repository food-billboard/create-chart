import { useUpdateEffect } from 'ahooks';
import { Modal } from 'antd';
import type { ModalProps } from 'antd';
import CopyAndPasteUtil from '@/utils/Assist/CopyAndPaste';

const FocusModal = (props: ModalProps) => {
  const { open } = props;

  useUpdateEffect(() => {
    if (open) {
      CopyAndPasteUtil.forceFocus();
    } else {
      CopyAndPasteUtil.forceUnFocus();
    }
  }, [open]);

  return <Modal {...props} />;
};

export default FocusModal;
