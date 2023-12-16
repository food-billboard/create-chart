import { useDebounceFn } from 'ahooks';
import { Tooltip } from 'antd';
import { useState } from 'react';
import IconFont from '@/components/ChartComponents/Common/Icon';
import DebounceButton from '@/components/DebounceButton';
import RequestDefaultConfigManage from './Form';

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
      <Tooltip title="请求默认配置">
        <DebounceButton
          icon={<IconFont type="icon-datafull" title="请求默认配置" />}
          onClick={handleOpen}
          type={visible ? 'primary' : 'default'}
        />
      </Tooltip>
      <RequestDefaultConfigManage
        visible={visible}
        onVisibleChange={setVisible}
      />
    </>
  );
};

export default RequestDefaultConfigIcon;
