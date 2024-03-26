import { CameraOutlined } from '@ant-design/icons';
import { Dropdown } from 'antd';
import type { ButtonProps } from 'antd';
import { noop } from 'lodash';
import { useCallback, useRef } from 'react';
import { connect } from 'umi';
import DebounceButton from '@/components/DebounceButton';
import Drawer, { ScreenShotManageRef } from './components/ScreenShotManage';
import useService from './components/ScreenShotManage/useService';
import { mapStateToProps, mapDispatchToProps } from './connect';

// 大屏快照
const ScreenShotManage = (props: {
  buttonProps?: ButtonProps;
  _id: string;
}) => {
  const { buttonProps = {}, _id } = props;

  const { onAdd } = useService({ screen: _id });

  const drawerRef = useRef<ScreenShotManageRef>(null);

  const onMenuClick = useCallback(({ key }) => {
    switch (key) {
      case 'add':
        return onAdd(noop);
      case 'manage':
        drawerRef.current?.open();
    }
  }, []);

  return (
    <>
      <Dropdown
        menu={{
          items: [
            {
              key: 'add',
              label: '新增快照',
            },
            {
              key: 'manage',
              label: '管理快照',
            },
          ],
          onClick: onMenuClick,
        }}
      >
        <DebounceButton
          icon={<CameraOutlined title="快照" />}
          {...buttonProps}
        />
      </Dropdown>
      <Drawer ref={drawerRef} />
    </>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(ScreenShotManage);
