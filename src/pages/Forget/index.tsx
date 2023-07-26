import { Button, message } from 'antd';
import { useCallback, useMemo, useState } from 'react';
import { connect } from 'umi';
import { Captcha, Email, Password } from '../Login';
import CommonBackground from '../Login/components/Background';
import { mapDispatchToProps, mapStateToProps } from './connect';

const Forget = (props: { forger: (value: any) => any }) => {
  const { forger } = props;

  const [password, setPassword] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [captcha, setCaptcha] = useState<string>('');
  const [fetchLoading, setFetchLoading] = useState<boolean>(false);

  const handleForget = useCallback(async () => {
    if (fetchLoading) return;
    const realEmail = email.trim();
    const realCaptcha = captcha.trim();
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
      await forger({ password, captcha: realCaptcha, email: realEmail });
    } catch (err) {
      message.info('提交错误');
    } finally {
      setFetchLoading(false);
    }
  }, [password, forger, email, captcha]);

  const action = useMemo(() => {
    return (
      <Button
        style={{ marginTop: 4 }}
        loading={fetchLoading}
        type="primary"
        block
        onClick={handleForget}
      >
        提交
      </Button>
    );
  }, [handleForget]);

  return (
    <CommonBackground title="忘记密码" action={action} onSubmit={handleForget}>
      <Email value={email} onChange={setEmail} />
      <Captcha
        email={email}
        value={captcha}
        onChange={setCaptcha}
        status="forget"
      />
      <Password value={password} onChange={setPassword} />
    </CommonBackground>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Forget);
