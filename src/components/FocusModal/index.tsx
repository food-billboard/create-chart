import { useUpdateEffect } from 'ahooks';
import { Modal } from 'antd';
import type { ModalProps as AntModalProps } from 'antd';
import CopyAndPasteUtil from '@/utils/Assist/CopyAndPaste';
import { ContentLoading } from '../PageLoading';

export type ModalProps = AntModalProps & {
  loading?: boolean;
};

const FocusModal = (props: ModalProps) => {
  const { open, children, loading, ...nextProps } = props;

  useUpdateEffect(() => {
    if (open) {
      CopyAndPasteUtil.forceFocus();
    } else {
      CopyAndPasteUtil.forceUnFocus();
    }
  }, [open]);

  return (
    <Modal {...nextProps} open={open}>
      {loading ? <ContentLoading /> : children}
    </Modal>
  );
};

export default FocusModal;
