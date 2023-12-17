import { useDebounceFn } from 'ahooks';
import { Tooltip } from 'antd';
import { useState } from 'react';
import IconFont from '@/components/ChartComponents/Common/Icon';
import DebounceButton from '@/components/DebounceButton';
import ThemeConfig from './Form';

// 请求默认配置
const RequestDefaultConfigIcon = () => {
  const [visible, setVisible] = useState(false);

  const { run: handleOpen } = useDebounceFn(
    () => {
      setVisible((prev) => !prev);
    },
    { wait: 200 },
  );

  return (
    <>
      <Tooltip title="主题色">
        <DebounceButton
          icon={<IconFont type="icon-ziyuan" title="主题色" />}
          onClick={handleOpen}
          type={visible ? 'primary' : 'default'}
        />
      </Tooltip>
      <ThemeConfig visible={visible} onVisibleChange={setVisible} />
    </>
  );
};

export default RequestDefaultConfigIcon;
