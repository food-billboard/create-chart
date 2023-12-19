import { useDebounceFn } from 'ahooks';
import { useState } from 'react';
import IconFont from '@/components/ChartComponents/Common/Icon';
import DebounceButton from '@/components/DebounceButton';
import Tooltip from '@/components/Tooltip';
import LensManage from './Form';

// 全局滤镜
const LensIcon = () => {
  const [visible, setVisible] = useState(false);

  const { run: handleOpen } = useDebounceFn(
    () => {
      setVisible((prev) => !prev);
    },
    { wait: 200 },
  );

  return (
    <>
      <Tooltip title="全局滤镜">
        <DebounceButton
          icon={<IconFont type="icon-iconlvjingkua" title="全局滤镜" />}
          onClick={handleOpen}
          type={visible ? 'primary' : 'default'}
        />
      </Tooltip>
      <LensManage visible={visible} onVisibleChange={setVisible} />
    </>
  );
};

export default LensIcon;
