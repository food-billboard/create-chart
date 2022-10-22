import { useMemo, ReactNode, useCallback } from 'react';
import isMobileJudge from 'is-mobile';
import UaParser from 'ua-parser-js';
import { Result, Button } from 'antd';
import { ChromeOutlined } from '@ant-design/icons';
import { useLocalStorage } from '@/hooks';
import { LocalConfig } from '@/utils/Assist/LocalConfig';
import styles from './index.less';

const PromptChrome = (props: { children?: ReactNode }) => {
  const { children } = props;

  const [isIgnore, setIsIgnore] = useLocalStorage<{
    timestamps: number;
    value: boolean;
  }>(LocalConfig.CONFIG_KEY_CHROME_PROMPT, {
    value: false,
    timestamps: 0,
  });

  const isMobile = useMemo(() => {
    return isMobileJudge();
  }, []);

  const isChrome = useMemo(() => {
    return new UaParser().getBrowser().name?.toLowerCase() === 'chrome';
  }, []);

  const handleUse = useCallback(() => {
    setIsIgnore({
      timestamps: Date.now(),
      value: true,
    });
  }, [isIgnore]);

  if (
    isMobile ||
    isChrome ||
    !!isIgnore?.value ||
    (isIgnore?.timestamps ?? 0) > 1000 * 24 * 60 * 60
  )
    return <>{children}</>;

  return (
    <Result
      className={styles['component-prompt-chrome']}
      icon={<ChromeOutlined />}
      title="推荐使用Chrome浏览器！"
      extra={
        <Button type="primary" onClick={handleUse}>
          继续使用
        </Button>
      }
    />
  );
};

export default PromptChrome;
