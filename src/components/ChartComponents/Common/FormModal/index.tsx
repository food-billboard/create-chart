import { Button } from 'antd';
import type { ModalProps } from 'antd';
import classnames from 'classnames';
import { useCallback } from 'react';
import Modal from '@/components/FocusModal';
import { useControlDisableKeyPressVisible } from '@/hooks';
import { sleep } from '@/utils';

// 用于在一些表单容器很小的情况下，方便编辑

function FormModal<T extends object & { onClick?: (...args: any[]) => void }>(
  Component: any,
  ModalComponent?: any,
) {
  return (props: T & { modalProps?: ModalProps }) => {
    const { onClick: propsOnClick, modalProps, ...netProps } = props;

    const RealModalComponent = ModalComponent || Component;

    const [visible, setVisible] = useControlDisableKeyPressVisible(false);

    const close = useCallback(async () => {
      await sleep(100);
      setVisible(false);
    }, []);

    const onClick = useCallback(
      (...args) => {
        setVisible(true);
        propsOnClick?.(...args);
      },
      [propsOnClick],
    );

    return (
      <>
        <Component {...netProps} onClick={onClick} />
        <Modal
          open={visible}
          title="编辑"
          onCancel={close}
          footer={<Button onClick={close}>关闭</Button>}
          width={420}
          destroyOnClose
          {...modalProps}
          wrapClassName={classnames(
            modalProps?.wrapClassName,
            'design-config-format-font-size',
          )}
        >
          <RealModalComponent {...netProps} />
        </Modal>
      </>
    );
  };
}

export default FormModal;
