import {
  Modal,
  Form,
  Select,
  Radio,
  Input,
  App,
  Button,
  Typography,
} from 'antd';
import {
  forwardRef,
  useImperativeHandle,
  useCallback,
  useState,
  useMemo,
} from 'react';
import { shareScreenGet, closeShareScreen } from '@/services';
import { getShare } from '@/utils';

const { Item } = Form;
const { Password } = Input;
const { Paragraph } = Typography;

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
  open: (id: string) => void;
};

const ShareSetting = forwardRef<
  ShareSettingRef,
  {
    onOk?: (data: {
      auth: 'PUBLIC' | 'PRIVATE';
      time: number;
      password: string;
      _id: string;
    }) => void;
    onCancel?: () => void;
    onCancelShare?: () => void;
  }
>((props, ref) => {
  const { onOk: propsOnOk, onCancel: propsOnCancel, onCancelShare } = props;

  const [visible, setVisible] = useState<boolean>(false);
  const [auth, setAuth] = useState<'PUBLIC' | 'PRIVATE'>('PUBLIC');
  const [time, setTime] = useState<string>('30d');
  const [password, setPassword] = useState<string>('');
  const [screenId, setScreenId] = useState<string>('');
  const [shared, setShared] = useState<boolean>(false);

  const { message } = App.useApp();

  const clear = useCallback(() => {
    setAuth('PUBLIC');
    setTime('30d');
    setPassword('');
    setScreenId('');
    setShared(false);
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

  const fetchData = useCallback(async (id) => {
    try {
      const { auth, time } = await shareScreenGet({
        _id: id,
      });
      setAuth(auth || 'PUBLIC');
      setShared(!!auth);
      const target = TIME_MAP.find((item) => item.realValue === time);
      if (target) setTime(target.value);
    } catch (err) {}
  }, []);

  const open = useCallback(
    async (id: string) => {
      try {
        setScreenId(id);
        await fetchData(id);
        setVisible(true);
      } catch (err) {
        message.info('操作失败');
      }
    },
    [fetchData],
  );

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
      _id: screenId,
    });
    open(screenId);
    setShared(true);
  }, [auth, getTimeData, password, clear, screenId, open]);

  // 分享地址
  const shareAddress = useMemo(() => {
    return getShare(screenId);
  }, [screenId]);

  // 取消分享
  const shareScreenMethod = useCallback(
    async (e) => {
      e.stopPropagation();
      try {
        await closeShareScreen({ _id: screenId });
        open(screenId);
        setShared(false);
        message.success('操作成功');
      } catch (err) {
        message.info('操作失败');
      } finally {
        onCancelShare?.();
      }
    },
    [screenId, clear, onCancelShare, open],
  );

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
      onCancel={onCancel}
      open={visible}
      title="分享设置"
      footer={[
        shared ? (
          <Button key="un_share" danger onClick={shareScreenMethod}>
            取消分享
          </Button>
        ) : null,
        <Button key="cancel" onClick={onCancel}>
          关闭
        </Button>,
        <Button key="ok" onClick={onOk} type="primary">
          确定
        </Button>,
      ]}
    >
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
            options={TIME_MAP}
          />
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
        {shared && (
          <Item label="分享地址">
            <Paragraph copyable={{ tooltips: false }}>{shareAddress}</Paragraph>
          </Item>
        )}
      </Form>
    </Modal>
  );
});

export default ShareSetting;
