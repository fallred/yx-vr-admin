import React from 'react';
import { Link } from 'react-router-dom';
import { Tag, Space, Menu } from 'antd';
import { useRecoilState } from 'recoil';
import { userState } from '@/stores/recoilState';
import Notice from '@/pages/notification/index';

import Avatar from './avatar-dropdown';
import HeaderSearch from '../header-search';
import classes from './index.module.less';
import SelectLang from './select-lang';

import { ReactComponent as LanguageSvg } from '@/assets/header/language.svg';

const GlobalHeaderRight: React.FC = () => {
  const [user, setUser] = useRecoilState(userState);

  const { settings } = user;
  let className = classes.right;

  if (
    (settings.navTheme === "dark" && settings.layout === "top") ||
    settings.layout === "mix"
  ) {
    className = `${classes.right} ${classes.dark}`;
  }
  return (
    <Space className={className}>
      <Notice />
      <Avatar />
      <Link
        to={'/setting/updatePass'}
        className="upatePass"
      >
        修改密码
      </Link>
    </Space>
  );
};
export default GlobalHeaderRight;
