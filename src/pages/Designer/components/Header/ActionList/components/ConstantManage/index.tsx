import { GlobalOutlined } from '@ant-design/icons';
import { useDebounceFn } from 'ahooks';
import { useState } from 'react';
import DebounceButton from '@/components/DebounceButton';
import Tooltip from '@/components/Tooltip';
import ConstantsManage from './Form';

// 全局常量管理
const ConstantIcon = () => {
  const [visible, setVisible] = useState(false);

  const { run: handleOpen } = useDebounceFn(
    () => {
      setVisible((prev) => !prev);
    },
    { wait: 200 },
  );

  return (
    <>
      <Tooltip title="常量管理">
        <DebounceButton
          icon={<GlobalOutlined title="常量管理" />}
          onClick={handleOpen}
          type={visible ? 'primary' : 'default'}
        />
      </Tooltip>
      <ConstantsManage visible={visible} onVisibleChange={setVisible} />
    </>
  );
};

export default ConstantIcon;
