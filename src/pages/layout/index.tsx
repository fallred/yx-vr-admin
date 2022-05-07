import React, { FC, useEffect, Suspense, useCallback, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { createBrowserHistory } from "history";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import type { MenuDataItem } from "@ant-design/pro-layout";
import ProLayout from "@ant-design/pro-layout";
import {
  SmileOutlined,
  HeartOutlined,
  FrownOutlined,
  NotificationOutlined,
  SettingOutlined,
  ShopOutlined,
  ProjectOutlined,
  RadarChartOutlined,
  HomeOutlined
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useLocale } from "@/locales";
import { IMenuItem, IMenuTree, MenuChild } from "@/models/menu";
import { useGetSystemMenuTree, useGetUserMenuTree } from "@/api";
import { userState, userMenuTreeState } from "@/stores/recoilState";
import recoilService from '@/stores/recoilService';
import {queryMenuNode} from '@/lib/tree-util';
import RightContent from "./components/RightContent";
// import { ReactComponent as LogoSvg } from "@/assets/logo/logo.svg";
import LogoIcon from "@/assets/logo/logo.png";
import { useGuide } from "../guide/useGuide";
import Footer from "./components/Footer";

const history = createBrowserHistory();

const IconMap: { [key: string]: React.ReactNode } = {
  notification: <NotificationOutlined />,
  system: <SettingOutlined />,
  storeMng: <ShopOutlined />,
  businessMng: <RadarChartOutlined />,
  home: <HomeOutlined />,

  smile: <SmileOutlined />,
  heart: <HeartOutlined />,
  frown: <FrownOutlined />,
};

const LayoutPage: FC = ({ children }) => {
  const { data: userMenuTree, error: error1 } = useGetUserMenuTree();
  const { data: systemMenuTree, error: error2 } = useGetSystemMenuTree();
  const [pathname, setPathname] = useState("/welcome");
  const [user, setUser] = useRecoilState(userState);
  const { device, collapsed, newUser, settings } = user;
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

    const m = menus.map(({ icon, children, ...item }) => ({
      ...item,
      key: item.menuId,
      name: item.menuName,
      path: item.url,
      icon: icon && IconMap[icon as string],
      children: children && loopMenuItem(children),
    }));

    return m;
  };
  const generateMenuList = () => {
    const list = loopMenuItem(userMenuTree);
    return list;
  };
  const handlePageChange = (location: Location) => {
    const menuNode = queryMenuNode(userMenuTree, 'url', location.pathname);
    const {permission = []} = menuNode ?? {};
    recoilService.getPermissionList(permission);
  };
  useEffect(() => {
    if (location.pathname === "/") {
      navigate("/home");
    }
  }, [navigate, location]);
  useEffect(() => {
    recoilService.getSystemMenuTree(systemMenuTree);
  }, [systemMenuTree]);
  useEffect(() => {
    recoilService.getUserMenuTree(userMenuTree);
  }, [userMenuTree]);
  useEffect(() => {
    newUser && driverStart();
  }, [newUser]);

  return (
    <ProLayout
      fixSiderbar
      collapsed={collapsed}
      location={{
        pathname: location.pathname,
      }}
      {...settings}
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

        return <Link to={menuItemProps.url}>{defaultDom}</Link>;
      }}
      breadcrumbRender={(routers = []) => [
        {
          path: "/",
          breadcrumbName: formatMessage({ id: "menu.home" }),
        },
        ...routers,
      ]}
      itemRender={(route, params, routes, paths) => {
        const first = routes.indexOf(route) === 0;
        return first ? (
          <Link to={paths.join("/")}>{route.breadcrumbName}</Link>
        ) : (
          <span>{route.breadcrumbName}</span>
        );
      }}
      menuDataRender={() => generateMenuList()}
      // menuDataRender={() => m}
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
