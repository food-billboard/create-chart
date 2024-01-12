import { useKeyPress } from 'ahooks';
import type { ModalProps } from 'antd';
import {
  ReactNode,
  useCallback,
  useState,
  useImperativeHandle,
  forwardRef,
} from 'react';
import Modal from '@/components/FocusModal';

export type ConfirmModalRef = {
  open: () => void;
};

const ConfirmModal = forwardRef<
  ConfirmModalRef,
  Partial<ModalProps> & {
    children?: ReactNode;
  }
>((props, ref) => {
  const [visible, setVisible] = useState<boolean>(!!props.visible);

  const {
    visible: propsVisible,
    onOk: propsOnOk,
    onCancel: propsOnCancel,
    children,
    ...nextProps
  } = props;

  useKeyPress('esc', (e) => {
    if (!visible) return;
    onCancel?.(e as any);
  });

  useKeyPress('enter', (e) => {
    if (!visible) return;
    onOk?.(e as any);
  });

  const onOk = useCallback(
    (e) => {
      propsOnOk?.(e);
      setVisible(false);
    },
    [propsOnOk],
  );

  const onCancel = useCallback(
    (e) => {
      propsOnCancel?.(e);
      setVisible(false);
    },
    [propsOnCancel],
  );

  useImperativeHandle(
    ref,
    () => {
      return {
        open: () => {
          setVisible(true);
        },
      };
    },
    [],
  );

  return (
    <Modal
      title="提示"
      open={visible}
      okText="确定(enter)"
      cancelText="取消(esc)"
      onOk={onOk}
      onCancel={onCancel}
      {...nextProps}
    >
      {children}
    </Modal>
  );
});

export default ConfirmModal;
