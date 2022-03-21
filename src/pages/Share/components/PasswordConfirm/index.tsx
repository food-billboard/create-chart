import { forwardRef, useImperativeHandle, useCallback, useState } from 'react';
import { Modal, Input, message, Button } from 'antd';

const { Password } = Input;

export type PasswordConfirmRef = {
  open: () => void;
};

const PasswordConfirm = forwardRef<
  PasswordConfirmRef,
  {
    onOk?: (value: string) => Promise<boolean>;
  }
>((props, ref) => {
  const { onOk: propsOnOk } = props;

  const [visible, setVisible] = useState<boolean>(false);
  const [password, setPassword] = useState<string>('');

  const clear = useCallback(() => {
    setPassword('');
  }, []);

  const onOk = useCallback(() => {
    if (!password.length) {
      message.info('请输入密码');
      return;
    }
    if (propsOnOk) {
      propsOnOk(password)
        .then((data) => {
          if (data) {
            setVisible(false);
            clear();
          } else {
            message.info('密码错误');
          }
        })
        .catch((err) => {
          message.info('请重试');
        });
    } else {
      setVisible(false);
      clear();
    }
  }, [clear]);

  const open = useCallback(() => {
    setVisible(true);
  }, []);

  useImperativeHandle(
    ref,
    () => {
      return {
        open,
      };
    },
    [],
  );

  return (
    <Modal
      onOk={onOk}
      visible={visible}
      title="分享密码"
      closable={false}
      maskClosable={false}
      footer={[
        <Button type="primary" onClick={onOk}>
          确认
        </Button>,
      ]}
    >
      <Password
        className="w-100"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />
    </Modal>
  );
});

export default PasswordConfirm;
