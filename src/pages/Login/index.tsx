import {
  CSSProperties,
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import classnames from 'classnames';
import { history } from 'umi';
import {
  UserOutlined,
  LockOutlined,
  MobileOutlined,
  BarcodeOutlined,
} from '@ant-design/icons';
import { Form, Input, Row, Col, Button, message, Space } from 'antd';
import Icon from '@/components/ChartComponents/Common/Icon';
import { getCaptcha } from '@/services';
import styles from './index.less';

const { Password: InputPassword } = Input;

const Mobile = (props: {
  value?: string;
  onChange?: (value: string) => void;
}) => {
  const { value, onChange } = props;

  return (
    <Input
      placeholder="手机号"
      className="w-100"
      value={value}
      prefix={<MobileOutlined />}
      onChange={(e) => {
        onChange?.(e.target.value);
      }}
      type="tel"
    />
  );
};

const Username = (props: {
  value?: string;
  onChange?: (value: string) => void;
}) => {
  const { value, onChange } = props;

  return (
    <Input
      placeholder="用户名"
      className="w-100"
      value={value}
      prefix={<UserOutlined />}
      onChange={(e) => {
        onChange?.(e.target.value);
      }}
    />
  );
};

const Email = (props: {
  value?: string;
  onChange?: (value: string) => void;
}) => {
  const { value, onChange } = props;

  return (
    <Input
      placeholder="邮箱"
      className="w-100"
      value={value}
      prefix={<Icon type="icon-email" />}
      onChange={(e) => {
        onChange?.(e.target.value);
      }}
    />
  );
};

const Password = (props: {
  value?: string;
  onChange?: (value: string) => void;
}) => {
  const { value, onChange } = props;

  return (
    <InputPassword
      placeholder="密码"
      className="w-100"
      value={value}
      prefix={<LockOutlined />}
      onChange={(e) => {
        onChange?.(e.target.value);
      }}
    />
  );
};

const Captcha = (props: {
  value?: string;
  onChange?: (value: string) => void;
  status: 'register' | 'forget';
  email?: string;
}) => {
  const [count, setCount] = useState<number>(0);
  const [timing, setTiming] = useState(false);

  const { value, onChange, status, email } = props;

  const onGetCaptcha = useCallback(async () => {
    if (!email) {
      message.info('请输入邮箱');
      return;
    }
    const result = await getCaptcha(email || '', status || 'register');
    if (result === false) {
      return;
    }
    setTiming(true);
  }, [email]);

  useEffect(() => {
    let interval: number = 0;
    if (timing) {
      interval = window.setInterval(() => {
        setCount((preSecond) => {
          if (preSecond <= 1) {
            setTiming(false);
            clearInterval(interval);
            // 重置秒数
            return 60;
          }
          return preSecond - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timing]);

  return (
    <Row gutter={8}>
      <Col span={16}>
        <Input
          placeholder="验证码"
          className="w-100"
          value={value}
          prefix={<BarcodeOutlined />}
          onChange={(e) => {
            onChange?.(e.target.value);
          }}
        />
      </Col>
      <Col span={8}>
        <Button
          disabled={timing}
          className={styles.getCaptcha}
          size="large"
          onClick={onGetCaptcha}
        >
          {timing ? `${count} 秒` : '获取验证码'}
        </Button>
      </Col>
    </Row>
  );
};

export const CommonBackground = (props: {
  style?: CSSProperties;
  className?: string;
  children?: ReactNode;
  title?: ReactNode;
  subTitle?: ReactNode;
  tips?: ReactNode;
  action?: ReactNode;
}) => {
  const { className, style, title, subTitle, children, tips, action } = props;

  return (
    <div
      className={classnames(styles['login-form-background'], className)}
      style={style}
    >
      <div className={styles['login-form-main']}>
        <div className={styles['login-form-main-title']}>{title}</div>
        <div className={styles['login-form-main-sub-title']}>{subTitle}</div>
        <div className={styles['login-form-main-content']}>
          <Form>
            <Space className="w-100" direction="vertical">
              {children}
            </Space>
          </Form>
        </div>
        <div className={styles['login-form-main-tips']}>{tips}</div>
        <div className={styles['login-form-main-action']}>{action}</div>
      </div>
    </div>
  );
};

const Login = () => {
  const [mobile, setMobile] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const tips = useMemo(() => {
    return (
      <div
        className={'dis-flex'}
        style={{
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Button
          type="link"
          onClick={() => {
            history.push('/register');
          }}
        >
          注册
        </Button>
        <Button
          type="link"
          onClick={() => {
            history.push('/forget');
          }}
        >
          忘记密码
        </Button>
      </div>
    );
  }, []);

  const handleLogin = useCallback(() => {}, [mobile, password]);

  const action = useMemo(() => {
    return (
      <Button type="primary" block onClick={handleLogin}>
        登录
      </Button>
    );
  }, [handleLogin]);

  return (
    <CommonBackground title="" subTitle="" tips={tips} action={action}>
      <Mobile value={mobile} onChange={setMobile} />
      <Password value={password} onChange={setPassword} />
    </CommonBackground>
  );
};

export default Login;
