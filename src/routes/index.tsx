import React, { lazy, FC } from "react";
import { useRoutes, RouteObject } from "react-router-dom";

import LoginPage from "@/pages/login";
import LayoutPage from "@/pages/layout";
import Notification from "@/pages/notification";
import WrapperRouteComponent from "./config";

const NotFound = lazy(() => import('@/pages/404'));
// const Project = lazy(() => import('@/pages/project'));

const SystemMng = lazy(() => import('@/pages/system/index'));
const RoleMng = lazy(() => import('@/pages/system/role'));
const UserMng = lazy(() => import('@/pages/system/user'));
const OperateLog = lazy(() => import('@/pages/system/operateLog'));
const NoticeMng = lazy(() => import('@/pages/system/notice'));

const StoreMng = lazy(() => import('@/pages/store-mng/index'));
const Associate = lazy(() => import('@/pages/store-mng/associate'));
const ShopList = lazy(() => import('@/pages/store-mng/shop-list'));
const ShopDetail = lazy(() => import('@/pages/store-mng/shop-detail'));

const BusinessMng = lazy(() => import('@/pages/business/index'));
const ReportList = lazy(() => import('@/pages/business/report-list'));
const RankList = lazy(() => import('@/pages/business/rank-list'));
const UpdatePass = lazy(() => import('@/pages/settings/update-pass'));

const routeList: RouteObject[] = [

  {
    path: "/",
    element: <WrapperRouteComponent auth={true} ><LayoutPage /></WrapperRouteComponent>,
    children: [
      // {
      //   path: "/dashboard",
      //   element: <WrapperRouteComponent><Dashboard /></WrapperRouteComponent>,
      // },
      // {
      //   path: "/project/list",
      //   element: <WrapperRouteComponent><Project /></WrapperRouteComponent>,
      // },

      {
        path: "/notification",
        element: <WrapperRouteComponent><Notification /></WrapperRouteComponent>,
      },
      {
        path: "/system/role",
        element: <WrapperRouteComponent><RoleMng /></WrapperRouteComponent>,
      },
      {
        path: "/system/user",
        element: <WrapperRouteComponent><UserMng /></WrapperRouteComponent>,
      },
      {
        path: "/system/operateLog",
        element: <WrapperRouteComponent><OperateLog /></WrapperRouteComponent>,
      },
      {
        path: "/system/noticeMng",
        element: <WrapperRouteComponent><NoticeMng /></WrapperRouteComponent>,
      },
      {
        path: "/storeMng/associate",
        element: <WrapperRouteComponent><Associate /></WrapperRouteComponent>,
      },
      {
        path: "/storeMng/shopList",
        element: <WrapperRouteComponent><ShopList /></WrapperRouteComponent>,
      },
      {
        path: "/storeMng/shopDetail",
        element: <WrapperRouteComponent><ShopDetail /></WrapperRouteComponent>,
      },
      {
        path: "/businessMng/reportList",
        element: <WrapperRouteComponent><ReportList /></WrapperRouteComponent>,
      },
      {
        path: "/businessMng/rankList",
        element: <WrapperRouteComponent><RankList /></WrapperRouteComponent>,
      },
      {
        path: "/setting/updatePass",
        element: <WrapperRouteComponent auth={true}><UpdatePass /></WrapperRouteComponent>,
      },
      {
        path: "*",
        element: <WrapperRouteComponent><NotFound /></WrapperRouteComponent>,
      },
    ],
  },
  {
    path: "login",
    element: <LoginPage />,
  },
];

const RenderRouter: FC = () => {
  const element = useRoutes(routeList);
  return element;
};

export default RenderRouter;
