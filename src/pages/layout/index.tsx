import React, { FC, useEffect, Suspense, useCallback, useState } from 'react';
import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import { createBrowserHistory } from 'history';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import type { MenuDataItem } from '@ant-design/pro-layout';
import ProLayout from '@ant-design/pro-layout';
import {
  SmileOutlined,
  HeartOutlined,
  FrownOutlined,
  NotificationOutlined,
  SettingOutlined,
  ShopOutlined,
  ProjectOutlined,
  RadarChartOutlined,
  HomeOutlined,
  UserOutlined,
  AimOutlined,
  TableOutlined,
  ToTopOutlined,
  InboxOutlined,
  AppstoreOutlined,
  UserSwitchOutlined,
  FileSearchOutlined
} from '@ant-design/icons';

import { useLocale } from '@/locales';
import { IMenuItem, IMenuTree, MenuChild } from '@/models/menu';
import { userState, userInfoState } from '@/stores/recoilState';
import {
  useGetCurrentUser, useGetSystemMenuTree,
  useGetUserMenuTree, useQueryUserDetail
} from '@/api';
import recoilService from '@/stores/recoilService';
import {queryMenuNode} from '@/lib/tree-util';
import RenderRouter from '@/routes/index';
import {userMenuTree1} from '@/config/menu-config';
// import { ReactComponent as LogoSvg } from '@/assets/logo/logo.svg';
import LogoIcon from '@/assets/logo/logo-2.png';
import { useGuide } from '../guide/useGuide';
import Footer from './components/footer';
import RightContent from './components/right-content';

const history = createBrowserHistory();

const IconMap: { [key: string]: React.ReactNode } = {
  home: <HomeOutlined />,
  system: <SettingOutlined />,
  storeMng: <AppstoreOutlined />,
  "storeMng ": <AppstoreOutlined />,
  businessMng: <RadarChartOutlined />,
  notification: <NotificationOutlined />,

  smile: <SmileOutlined />,
  heart: <HeartOutlined />,
  frown: <FrownOutlined />,
  user: <UserOutlined />,
  userGroup:  <UserSwitchOutlined />,
  aimout: <AimOutlined />,
  table: <TableOutlined />,
  rank: <ToTopOutlined />,
  
  shopDetail: <ShopOutlined />,
  shopList: <InboxOutlined />,
  log: <FileSearchOutlined />,
};

const LayoutPage: FC = ({ children }) => {
  const [user, setUser] = useRecoilState(userState);
  const userName = localStorage.getItem('userName');
  const { device, collapsed, newUser, settings } = user;
  const { data: userMenuTree, error: error1 } = useGetUserMenuTree();
  const { data: systemMenuTree, error: error2 } = useGetSystemMenuTree();
  const { data: userDetail } = useQueryUserDetail({userAccount: user.userAccount});
  
  const [pathname, setPathname] = useState("/welcome");
  const [openKeys, setOpenKeys] = useState([]);
  const [selectedKeys, setSelectedKeys] = useState([]);
  
  const isMobile = device === "MOBILE";
  const { driverStart } = useGuide();
  const location = useLocation();
  const navigate = useNavigate();
  const { formatMessage } = useLocale();

  const toggle = () => {
    setUser({ ...user, collapsed: !collapsed });
  };

  const loopMenuItem = (menus?: IMenuTree): MenuDataItem[] => {
    if (!menus || menus.length === 0) return [];

    const m = menus.map(({ icon, children: child, ...item }) => ({
      ...item,
      key: item.menuId,
      name: item.menuName,
      path: item.url,
      icon: icon && IconMap[icon as string],
      children: child && loopMenuItem(child),
    }));

    return m;
  };
  const generateMenuList = () => {
    const list = loopMenuItem(userMenuTree);
    return list;
  };
  const handlePageChange = (location: Location) => {
    const menuNode = queryMenuNode(userMenuTree, 'url', location.pathname);
    console.log('menuNode:', menuNode);
    const {permission = []} = menuNode ?? {};
    recoilService.getPermissionList(permission);
  };
  const onOpenChange = data => {
    //  const latestOpenKey = openKeys.find(key => openKeys.indexOf(key) === -1);
    //  if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
    //    this.setState({ openKeys });
    //   } else {
    //    this.setState({
    //      openKeys: latestOpenKey ? [latestOpenKey] : [],
    //     });
    //   }
    const menuIds = data.map(key => `${key}`);
    console.log('onOpenChange keys:', menuIds);
    setOpenKeys(menuIds);
  };
  const onSelectChange = (data) => {
    console.log('onSelectChange data:', data);
    // console.log('onSelectChange keys:', keys);
    const menuIds = data.map(key => `${key}`);
    setSelectedKeys(menuIds);
  };
  useEffect(() => {
    if (location.pathname === "/") {
      navigate("/home");
    }
  }, [navigate, location]);
  useEffect(() => {
    newUser && driverStart();
  }, [newUser]);
  useEffect(() => {
    recoilService.getSystemMenuTree(systemMenuTree);
  }, [systemMenuTree]);
  useEffect(() => {
    recoilService.getUserMenuTree(userMenuTree);
  }, [userMenuTree]);
  useEffect(() => {
    recoilService.getUserInfo(userDetail);
  }, [userDetail]);
  return (
    <ProLayout
      fixSiderbar
      collapsed={collapsed}
      location={{
        pathname: location.pathname,
      }}
      {...settings}
      waterMarkProps={{
        content: userName,
      }}
      menu={{defaultOpenAll: true, selectable: true}}
      openKeys={openKeys}
      selectedKeys={selectedKeys}
      onOpenChange={onOpenChange}
      onSelect={onSelectChange}
      onCollapse={toggle}
      onPageChange={handlePageChange}
      // onMenuHeaderClick={() => history.push("https://reactjs.org/")}
      headerTitleRender={(logo, title, props) => (
        <a
          className="layout-page"
        >
          {logo ? <img className="layout-page-logo" src={LogoIcon} /> : null}
          {title}
        </a>
      )}
      menuHeaderRender={undefined}
      menuItemRender={(menuItemProps, defaultDom) => {
        if (
          menuItemProps.isUrl ||
          !menuItemProps.url ||
          location.pathname === menuItemProps.url
        ) {
          return defaultDom;
        }
        return <Link to={menuItemProps.url} onClick={setPathname(menuItemProps.url || '')}>{defaultDom}</Link>;
      }}
      breadcrumbRender={(routers = []) => {
        const [menuRouter, ...rest] = routers;
        return [
          {
            path: "/",
            breadcrumbName: menuRouter?.breadcrumbName ?? '--',
          },
          ...rest
        ];
      }}
      itemRender={(route, params, routes, paths) => {
        const first = routes.indexOf(route) === 0;
        return first ? (
          <Link to={paths.join("/")}>{route.breadcrumbName}</Link>
        ) : (
          <span>{route.breadcrumbName}</span>
        );
      }}
      menuDataRender={() => loopMenuItem(userMenuTree)}
      rightContentRender={() => <RightContent />}
      footerRender={() => <Footer />}
      collapsedButtonRender={() => {
        return (
          <div
            onClick={() => toggle}
            style={{
              cursor: "pointer",
              fontSize: "16px",
            }}
          >
            <span id="sidebar-trigger">
              {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            </span>
          </div>
        );
      }}
    >
      <Outlet />
    </ProLayout>
  );
};

export default LayoutPage;
