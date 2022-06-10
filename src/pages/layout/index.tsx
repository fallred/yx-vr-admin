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
  HomeOutlined,
  UserOutlined,
  AimOutlined,
  TableOutlined,
  ToTopOutlined,
  InboxOutlined,
  AppstoreOutlined,
  UserSwitchOutlined,
  FileSearchOutlined
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useLocale } from "@/locales";
import { IMenuItem, IMenuTree, MenuChild } from "@/models/menu";
// import {
//   useGetSystemMenuTree, useGetUserMenuTree,
//   useGetSystemMenuTree1, useGetUserMenuTree1,
// } from "@/api";
import { userState, userMenuTreeState, systemMenuTreeState } from "@/stores/recoilState";
import recoilService from '@/stores/recoilService';
import {queryMenuNode} from '@/lib/tree-util';
import RenderRouter from '@/routes/index';
import {userMenuTree} from '@/config/menu-config';
// import { ReactComponent as LogoSvg } from "@/assets/logo/logo.svg";
import LogoIcon from "@/assets/logo/logo.png";
import { useGuide } from "../guide/useGuide";
import Footer from "./components/Footer";
import RightContent from "./components/RightContent";

const history = createBrowserHistory();

const IconMap: { [key: string]: React.ReactNode } = {
  home: <HomeOutlined />,
  system: <SettingOutlined />,
  storeMng: <AppstoreOutlined />,
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
  // const { data: userMenuTree, error: error1 } = useGetUserMenuTree();
  // const { data: systemMenuTree, error: error2 } = useGetSystemMenuTree();
  // const fetchUserMenuTree1 = useGetUserMenuTree1();
  // const fetchSystemMenuTree1 = useGetSystemMenuTree1();
  // const userMenuTree = useRecoilValue(userMenuTreeState);
  const systemMenuTree = useRecoilValue(systemMenuTreeState);
  const [pathname, setPathname] = useState("/welcome");
  const [openMenuKeys, setOpenMenuKeys] = useState([]);
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
  const onOpenChange = openKeys => {
    //  const latestOpenKey = openKeys.find(key => openMenuKeys.indexOf(key) === -1);
    //  if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
    //    this.setState({ openKeys });
    //   } else {
    //    this.setState({
    //      openKeys: latestOpenKey ? [latestOpenKey] : [],
    //     });
    //   }
    setOpenMenuKeys(openKeys);
  };
  useEffect(() => {
    if (location.pathname === "/") {
      navigate("/home");
    }
  }, [navigate, location]);
  useEffect(() => {
    newUser && driverStart();
  }, [newUser]);
  // useEffect(() => {
  //   recoilService.getSystemMenuTree(systemMenuTree);
  // }, [systemMenuTree]);
  // useEffect(() => {
  //   recoilService.getUserMenuTree(userMenuTree);
  // }, [userMenuTree]);

  // openKeys={openMenuKeys}
  // onOpenChange={onOpenChange}
  return (
    <ProLayout
      fixSiderbar
      collapsed={collapsed}
      location={{
        pathname: location.pathname,
      }}
      {...settings}
      waterMarkProps={{
        content: '影行科技',
      }}
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
      // menu={{ request: async () => {
      //   console.log('menu render:', tree);
      //   const tree = await fetchSystemMenuTree1();
      //   const treeTrans = loopMenuItem(tree);
      //   return treeTrans;
      // }}}
      menuDataRender={() => loopMenuItem(userMenuTree)}
      // postMenuData={() => generateMenuList()}
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
