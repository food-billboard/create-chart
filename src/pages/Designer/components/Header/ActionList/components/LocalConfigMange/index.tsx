import { MacCommandOutlined } from '@ant-design/icons';
import { useDebounceFn } from 'ahooks';
import { useState } from 'react';
import DebounceButton from '@/components/DebounceButton';
import Tooltip from '@/components/Tooltip';
import LocalConfigMange from './Form';

// 本地配置管理
const CallbackIcon = () => {
  const [visible, setVisible] = useState(false);

  const { run: handleOpen } = useDebounceFn(
    () => {
      setVisible((prev) => !prev);
    },
    { wait: 200 },
  );

  return (
    <>
      <Tooltip title="本地配置管理">
        <DebounceButton
          icon={<MacCommandOutlined title="本地配置管理" />}
          onClick={handleOpen}
          type={visible ? 'primary' : 'default'}
        />
      </Tooltip>
      <LocalConfigMange visible={visible} onVisibleChange={setVisible} />
    </>
  );
};

export default CallbackIcon;
