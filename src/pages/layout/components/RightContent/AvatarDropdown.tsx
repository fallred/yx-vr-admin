import React, { useCallback } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

import {
  LogoutOutlined,
  SettingOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Avatar, Menu, Spin } from "antd";

import HeaderDropdown from "../HeaderDropdown";
import classes from "./index.module.less";
import { useRecoilState } from "recoil";
import { userState } from "@/stores/recoilState";

export type GlobalHeaderRightProps = {
  menu?: boolean;
};

const AvatarDropdown: React.FC<GlobalHeaderRightProps> = ({ menu }) => {
  const [user, setUser] = useRecoilState(userState);

  const { userName, avatar } = user;

  const navigate = useNavigate();
  const location = useLocation();

  /**
   * 退出登录，并且将当前的 url 保存
   */
  const loginOut = async () => {
    // Note: There may be security issues, please note
    if (location.pathname !== "/login") {
      navigate("/login", {
        replace: true,
      });
    }
  };

  const onMenuClick = useCallback(
    (event) => {
      const { key } = event;
      if (key === "logout" && user) {
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
        size="small"
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
      className={"menu"}
      items={menuItems}
      selectedKeys={[]}
      onClick={onMenuClick}
    />
  );
  return (
    <HeaderDropdown overlay={menuHeaderDropdown}>
      <span className={`${classes.action} ${classes.account}`}>
        <Avatar
          size="small"
          className={classes.avatar}
          src={avatar}
          alt="avatar"
        />
        <span className={`${classes.name} anticon`}>{userName}</span>
      </span>
    </HeaderDropdown>
  );
};

export default AvatarDropdown;
