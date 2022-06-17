import React, { useCallback } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Avatar, Menu, Spin } from 'antd';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  LogoutOutlined,
  SettingOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { userState, userInfoState } from '@/stores/recoilState';
import HeaderDropdown from '../header-dropdown';
import classes from './index.module.less';

export type GlobalHeaderRightProps = {
  menu?: boolean;
};

const AvatarDropdown: React.FC<GlobalHeaderRightProps> = ({ menu }) => {
  const [user, setUser] = useRecoilState(userState);
  const userInfo = useRecoilValue(userInfoState);

  const { userName, avatar } = user;

  const navigate = useNavigate();
  const location = useLocation();

  const loginOut = async () => {
    if (location.pathname !== '/login') {
      navigate('/login', {
        replace: true,
      });
    }
  };

  const onMenuClick = useCallback(
    (event) => {
      const { key } = event;
      if (key === 'logout' && user) {
        setUser({ ...user, logged: false });
        localStorage.setItem('accessToken', '');
        loginOut();
        return;
      }
      navigate(`/account/${key}`);
    },
    [user, setUser]
  );

  const loading = (
    <span className={`account`}>
      <Spin
        size='small'
        style={{
          marginLeft: 8,
          marginRight: 8,
        }}
      />
    </span>
  );

  if (!user) {
    return loading;
  }

  if (!userName) {
    return loading;
  }

  const menuItems = [
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: '退出登录',
    },
  ];

  const menuHeaderDropdown = (
    <Menu
      className={'menu'}
      items={menuItems}
      selectedKeys={[]}
      onClick={onMenuClick}
    />
  );
  return (
    <HeaderDropdown overlay={menuHeaderDropdown}>
      <span className={`${classes.action} ${classes.account}`}>
        <Avatar
          size='small'
          className={classes.avatar}
          src={userInfo.imageUrl}
          alt='avatar'
        />
        <span className={`${classes.name} anticon`}>{userName}</span>
      </span>
    </HeaderDropdown>
  );
};

export default AvatarDropdown;
