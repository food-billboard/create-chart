import { ToolOutlined } from '@ant-design/icons';
import { useDebounceFn } from 'ahooks';
import { Tooltip } from 'antd';
import { useState } from 'react';
import DebounceButton from '@/components/DebounceButton';
import CallbackManage from './Form';

// 回调管理
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
      <Tooltip title="回调管理">
        <DebounceButton
          icon={<ToolOutlined title="回调管理" />}
          onClick={handleOpen}
          type={visible ? 'primary' : 'default'}
        />
      </Tooltip>
      <CallbackManage visible={visible} onClose={setVisible} />
    </>
  );
};

export default CallbackIcon;
