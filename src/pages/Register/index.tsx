import { useCallback, useMemo, useState } from 'react';
import { connect } from 'dva';
import { Button, message } from 'antd';
import { Mobile, Email, Password, Captcha } from '../Login';
import CommonBackground from '../Login/components/Background';
import { mapStateToProps, mapDispatchToProps } from './connect';

const Register = (props: { register: (value: any) => any }) => {
  const { register } = props;

  const [mobile, setMobile] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [captcha, setCaptcha] = useState<string>('');
  const [fetchLoading, setFetchLoading] = useState<boolean>(false);

  const handleRegister = useCallback(async () => {
    if (fetchLoading) return;
    const realMobile = mobile.trim();
    const realEmail = email.trim();
    const realCaptcha = captcha.trim();
    if (!realMobile) {
      return message.info('请输入手机号');
    }
    if (!password) {
      return message.info('请输入密码');
    }
    if (!realEmail) {
      return message.info('请输入邮箱');
    }
    if (!realCaptcha) {
      return message.info('请输入验证码');
    }

    setFetchLoading(true);
    try {
      await register({
        mobile: realMobile,
        password,
        captcha: realCaptcha,
        email: realEmail,
      });
    } catch (err) {
      message.info('提交错误');
    } finally {
      setFetchLoading(false);
    }
  }, [mobile, password, captcha, email, register]);

  const action = useMemo(() => {
    return (
      <Button
        style={{ marginTop: 4 }}
        loading={fetchLoading}
        type="primary"
        block
        onClick={handleRegister}
      >
        注册
      </Button>
    );
  }, [handleRegister]);

  return (
    <CommonBackground
      title="Welcome"
      subTitle="数据可视化大屏注册🐲"
      action={action}
      onSubmit={handleRegister}
    >
      <Mobile value={mobile} onChange={setMobile} />
      <Password value={password} onChange={setPassword} />
      <Email value={email} onChange={setEmail} />
      <Captcha
        email={email}
        value={captcha}
        onChange={setCaptcha}
        status="register"
      />
    </CommonBackground>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
