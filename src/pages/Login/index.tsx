import { useCallback, useEffect, useMemo, useState } from 'react';
import { history } from 'umi';
import { connect } from 'dva';
import {
  UserOutlined,
  LockOutlined,
  MobileOutlined,
  BarcodeOutlined,
} from '@ant-design/icons';
import { Input, Row, Col, Button, message, Space } from 'antd';
import classnames from 'classnames';
import Icon from '@/components/ChartComponents/Common/Icon';
import { getCaptcha } from '@/services';
import { mapStateToProps, mapDispatchToProps } from './connect';
import CommonBackground from './components/Background';
import styles from './index.less';

const { Password: InputPassword } = Input;

export const Mobile = (props: {
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

export const Username = (props: {
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

export const Email = (props: {
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

export const Password = (props: {
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

export const Captcha = (props: {
  value?: string;
  onChange?: (value: string) => void;
  status: 'register' | 'forget';
  email?: string;
}) => {
  const [count, setCount] = useState<number>(60);
  const [timing, setTiming] = useState(false);

  const { value, onChange, status, email } = props;

  const onGetCaptcha = useCallback(async () => {
    const realEmail = email?.trim();
    if (!realEmail) {
      message.info('请输入邮箱');
      return;
    }
    await getCaptcha(realEmail || '', status || 'register');
    setTiming(true);
  }, [email, status]);

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
          onClick={onGetCaptcha}
          className={classnames('w-100', styles['component-captcha'])}
        >
          {timing ? `${count} 秒` : '获取验证码'}
        </Button>
      </Col>
    </Row>
  );
};

const Login = (props: { login: (value: any) => any }) => {
  const { login } = props;

  const [mobile, setMobile] = useState<string>('18356778908');
  const [password, setPassword] = useState<string>('123456789');
  const [fetchLoading, setFetchLoading] = useState<boolean>(false);

  const tips = useMemo(() => {
    return (
      <div
        style={{
          textAlign: 'right',
        }}
      >
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

  const handleLogin = useCallback(async () => {
    if (fetchLoading) return;
    const realMobile = mobile.trim();
    if (!realMobile || !password) {
      return message.info('账号或密码错误');
    }
    setFetchLoading(true);
    try {
      await login({ mobile: realMobile, password });
    } catch (err) {
      message.info('账号或密码错误');
    } finally {
      setFetchLoading(false);
    }
  }, [mobile, password, login, fetchLoading]);

  const action = useMemo(() => {
    return (
      <Space direction="vertical" className="w-100">
        <Button
          loading={fetchLoading}
          type="primary"
          block
          onClick={handleLogin}
        >
          登录
        </Button>
        <Button
          type="primary"
          block
          onClick={() => {
            history.push('/register');
          }}
        >
          注册
        </Button>
      </Space>
    );
  }, [handleLogin]);

  return (
    <CommonBackground
      title="登录"
      tips={tips}
      action={action}
      onSubmit={handleLogin}
    >
      <Mobile value={mobile} onChange={setMobile} />
      <Password value={password} onChange={setPassword} />
    </CommonBackground>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
