import { useCallback, useMemo } from 'react';
import { Avatar as AntAvatar, Dropdown } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { useMobxContext } from '@/hooks';

const Avatar = (props: {}) => {
  const {
    user: { currentUser: { avatar, username } = {}, logout },
  } = useMobxContext();

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

export default Avatar;
