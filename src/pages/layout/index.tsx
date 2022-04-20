import React, { FC, useEffect, Suspense, useCallback, useState } from "react";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { useRecoilState } from "recoil";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { MenuList, MenuChild } from "@/models/menu.interface";
import { useGetCurrentMenus, usePermissionList } from "@/api";
import { userState } from "@/stores/user";
import { permissionListState, menuListState } from '@/stores/menu';
import {systemMenuList} from '@/config/menu-config';
import { useGuide } from "../guide/useGuide";


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
  RadarChartOutlined
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useLocale } from "@/locales";
import { createBrowserHistory } from "history";
import RightContent from "./components/RightContent";
// import { ReactComponent as LogoSvg } from "@/assets/logo/logo.svg";
import LogoIcon from "@/assets/logo/logo.png";
import styles from "./index.module.less";
import Footer from "./components/Footer";
import { debug } from "console";

const history = createBrowserHistory();

const IconMap: { [key: string]: React.ReactNode } = {
  notification: <NotificationOutlined />,
  system: <SettingOutlined />,
  storeMng: <ShopOutlined />,
  businessMng: <RadarChartOutlined />,

  smile: <SmileOutlined />,
  heart: <HeartOutlined />,
  frown: <FrownOutlined />,
};

const LayoutPage: FC = ({ children }) => {
  // const { data: menuList, error } = useGetCurrentMenus();
  const { data: permitCodeList, error } = usePermissionList();
  const [permissionList, setPermissionList] = useRecoilState(permissionListState);
  const [menuList, setMenuList] = useRecoilState(menuListState);
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

  const initMenuListAll = (menu: MenuList) => {
    const MenuListAll: MenuChild[] = [];
    menu.forEach((m) => {
      if (!m?.children?.length) {
        MenuListAll.push(m);
      } else {
        m?.children.forEach((mu) => {
          MenuListAll.push(mu);
        });
      }
    });
    return MenuListAll;
  };

  const loopMenuItem = (menus?: MenuDataItem[]): MenuDataItem[] => {
    if (!menus) return [];

    const m = menus.map(({ icon, children, ...item }) => ({
      ...item,
      icon: icon && IconMap[icon as string],
      children: children && loopMenuItem(children),
    }));

    return m;
  };

  const loopMenuItem1 = (menus?: MenuDataItem[]): MenuDataItem[] => {
    if (!menus) return [];
    const m = [];
    menus.forEach(({ icon, children, ...item }) => {
      const menuItem = {
        ...item,
        icon: icon && IconMap[icon as string],
        children: children && loopMenuItem1(children),
      };
      const hasPermission = permissionList.includes(menuItem.code);
      if (hasPermission) {
        m.push(menuItem);
      }
    });
    return m;
  };
  const generateMenuList = () => {
    let menuListTemp = [];
    if (!permissionList || permissionList.length === 0) {
      menuListTemp = [];
    }
    else {
      menuListTemp = loopMenuItem1(systemMenuList);
    }
    return menuListTemp;
};

  useEffect(() => {
    if (location.pathname === "/") {
      navigate("/notification");
    }
  }, [navigate, location]);
  useEffect(() => {
    debugger;
    setPermissionList(permitCodeList);
  }, [permitCodeList]);
  useEffect(() => {
    const menuListTemp = generateMenuList();
    setMenuList(menuListTemp);
  }, [permissionList]);
  useEffect(() => {
    newUser && driverStart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      // onMenuHeaderClick={() => history.push("https://reactjs.org/")}
      headerTitleRender={(logo, title, props) => (
        <a
          className={styles.layoutPageHeader}
        >
          {logo ? <img className={styles.layoutPageLogo} src={LogoIcon} /> : null}
          {title}
        </a>
      )}
      menuHeaderRender={undefined}
      menuItemRender={(menuItemProps, defaultDom) => {
        if (
          menuItemProps.isUrl ||
          !menuItemProps.path ||
          location.pathname === menuItemProps.path
        ) {
          return defaultDom;
        }

        return <Link to={menuItemProps.path}>{defaultDom}</Link>;
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
