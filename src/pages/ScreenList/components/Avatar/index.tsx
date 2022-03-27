import { useCallback, useMemo } from 'react';
import { Avatar as AntAvatar, Dropdown, Menu } from 'antd';
import { connect } from 'dva';
import { UserOutlined } from '@ant-design/icons';
import { mapStateToProps, mapDispatchToProps } from './connect';

const Avatar = (props: { logout: () => void; userInfo: any }) => {
  const { logout, userInfo: { avatar, username } = {} } = props;

  const handleLogout = useCallback(async () => {
    await logout();
  }, [logout]);

  const menu = useMemo(() => {
    return (
      <Menu>
        <Menu.Item key="logout">
          <a onClick={handleLogout}>退出登录</a>
        </Menu.Item>
      </Menu>
    );
  }, [handleLogout]);

  return (
    <Dropdown overlay={menu} placement="bottomCenter">
      <AntAvatar src={avatar} icon={<UserOutlined />}>
        {username}
      </AntAvatar>
    </Dropdown>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Avatar);
