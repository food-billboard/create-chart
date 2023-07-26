import { UserOutlined } from '@ant-design/icons';
import { Avatar as AntAvatar, Dropdown } from 'antd';
import { useCallback, useMemo } from 'react';
import { connect } from 'umi';
import { mapDispatchToProps, mapStateToProps } from './connect';

const Avatar = (props: { logout: () => void; userInfo: any }) => {
  const { logout, userInfo: { avatar, username } = {} } = props;

  const handleLogout = useCallback(async () => {
    await logout();
  }, [logout]);

  const menu = useMemo(() => {
    return [
      {
        label: <a onClick={handleLogout}>退出登录</a>,
        key: 'logout',
      },
    ];
  }, [handleLogout]);

  return (
    <Dropdown menu={{ items: menu }} placement="bottom">
      <AntAvatar src={avatar} icon={<UserOutlined />}>
        {username}
      </AntAvatar>
    </Dropdown>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Avatar);
