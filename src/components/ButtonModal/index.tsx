import { Modal, Button } from 'antd';
import type { ButtonProps, ModalProps } from 'antd';
import {
  ReactNode,
  forwardRef,
  useCallback,
  useImperativeHandle,
  useState,
} from 'react';

export type ButtonModalRef = {
  visibleChange: (visible: boolean) => void;
};

export type ButtonModalProps = {
  buttonProps?: Partial<ButtonProps>;
  modalProps?: Partial<ModalProps>;
  children?: ReactNode;
  buttonChildren?: ReactNode;
};

const ButtonModal = forwardRef<ButtonModalRef, ButtonModalProps>(
  ({ buttonProps, modalProps, children, buttonChildren }, ref) => {
    const { onClick: buttonClick } = buttonProps || {};
    const { onCancel: modalOnCancel, onOk: modalOnOk } = modalProps || {};

    const [visible, setVisible] = useState(false);

    const handleAdd = useCallback(
      (e) => {
        setVisible(true);
        buttonClick?.(e);
      },
      [buttonClick],
    );

    const onModalCancel = useCallback(
      async (e) => {
        if (modalOnCancel) {
          const canClose = await Promise.resolve(modalOnCancel(e));
          if (typeof canClose === 'boolean' && !canClose) return;
        }
        setVisible(false);
      },
      [modalOnCancel],
    );

    const onModalOk = useCallback(
      async (e) => {
        if (modalOnOk) {
          const canClose = await Promise.resolve(modalOnOk(e));
          if (typeof canClose === 'boolean' && !canClose) return;
        }
        setVisible(false);
      },
      [modalOnOk],
    );

    useImperativeHandle(
      ref,
      () => {
        return {
          visibleChange: (visible) => setVisible(visible),
        };
      },
      [],
    );

    return (
      <>
        <Button type="primary" {...buttonProps} onClick={handleAdd}>
          {buttonChildren}
        </Button>
        <Modal
          {...modalProps}
          open={visible}
          onCancel={onModalCancel}
          onOk={onModalOk}
        >
          {children}
        </Modal>
      </>
    );
  },
);

export default ButtonModal;
