import { forwardRef, useImperativeHandle, useCallback, useState } from 'react';
import { Modal, Form, Select, Radio, Input, message } from 'antd';

const { Item } = Form;
const { Password } = Input;

const TIME_MAP = [
  {
    label: '1分钟',
    value: '1m',
    realValue: 1 * 60 * 1000,
  },
  {
    label: '1小时',
    value: '1h',
    realValue: 1 * 60 * 60 * 1000,
  },
  {
    label: '1天',
    value: '1d',
    realValue: 24 * 60 * 60 * 1000,
  },
  {
    label: '10天',
    value: '10d',
    realValue: 10 * 24 * 60 * 60 * 1000,
  },
  {
    label: '30天',
    value: '30d',
    realValue: 30 * 24 * 60 * 60 * 1000,
  },
  {
    label: '90天',
    value: '90d',
    realValue: 90 * 24 * 60 * 60 * 1000,
  },
];

export type ShareSettingRef = {
  open: () => void;
};

const ShareSetting = forwardRef<
  ShareSettingRef,
  {
    onOk?: (data: {
      auth: 'PUBLIC' | 'PRIVATE';
      time: number;
      password: string;
    }) => void;
    onCancel?: () => void;
  }
>((props, ref) => {
  const { onOk: propsOnOk, onCancel: propsOnCancel } = props;

  const [visible, setVisible] = useState<boolean>(false);
  const [auth, setAuth] = useState<'PUBLIC' | 'PRIVATE'>('PUBLIC');
  const [time, setTime] = useState<string>('30d');
  const [password, setPassword] = useState<string>('');

  const clear = useCallback(() => {
    setAuth('PUBLIC');
    setTime('30d');
    setPassword('');
  }, []);

  const onCancel = useCallback(() => {
    propsOnCancel?.();
    setVisible(false);
    clear();
  }, [propsOnCancel, clear]);

  const getTimeData = useCallback(() => {
    const target = TIME_MAP.find((item) => item.value === time);
    return target?.realValue || 30 * 24 * 60 * 60 * 1000;
  }, [time]);

  const onOk = useCallback(() => {
    if (password.length > 16) {
      message.info('密码不能多于16位');
      return;
    } else if (!!password.length && password.length < 8) {
      message.info('密码不能少于8位');
      return;
    }
    propsOnOk?.({
      auth,
      time: getTimeData(),
      password,
    });
    setVisible(false);
    clear();
  }, [auth, getTimeData, password, clear]);

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
    <Modal onCancel={onCancel} onOk={onOk} visible={visible} title="分享设置">
      <Form labelCol={{ span: 4 }} wrapperCol={{ span: 20 }}>
        <Item label="权限">
          <Radio.Group
            value={auth}
            onChange={(e) => {
              setAuth(e.target.value);
            }}
          >
            <Radio value="PUBLIC" key="PUBLIC">
              公开
            </Radio>
            <Radio value="PRIVATE" key="PRIVATE">
              私人
            </Radio>
          </Radio.Group>
        </Item>
        <Item label="过期时间">
          <Select
            value={time}
            onChange={(value) => {
              setTime(value);
            }}
            className="w-100"
          >
            {TIME_MAP.map((item) => {
              const { value, label } = item;
              return (
                <Select.Option key={value} value={value}>
                  {label}
                </Select.Option>
              );
            })}
          </Select>
        </Item>
        <Item label="密码" help="不用密码可不设">
          <Password
            className="w-100"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </Item>
      </Form>
    </Modal>
  );
});

export default ShareSetting;
