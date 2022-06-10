import React, { lazy, FC } from "react";
import { useRoutes, RouteObject } from "react-router-dom";

import LayoutPage from "@/pages/layout";
import SubLayout from "@/pages/layout/sub-layout";
import LoginPage from "@/pages/login";

const NotFound = lazy(() => import('@/pages/404'));
const Dashboard = lazy(() => import('@/pages/dashboard'));
const UpdatePass = lazy(() => import('@/pages/settings/update-pass'));

const Home = lazy(() => import('@/pages/home'));
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

import WrapperRouteComponent from "./config";

const routeList: RouteObject[] = [
    {
      path: "/",
      element: <WrapperRouteComponent auth={true} ><LayoutPage /></WrapperRouteComponent>,
      children: [
        {
          path: "home",
          element: <WrapperRouteComponent><Home /></WrapperRouteComponent>,
        },
        {
          path: "dashboard",
          element: <WrapperRouteComponent auth={true}><Dashboard /></WrapperRouteComponent>,
        },
        {
          path: "system",
          element: <WrapperRouteComponent auth={true}><SubLayout /></WrapperRouteComponent>,
          children: [
            {
              path: "/system",
              element: <WrapperRouteComponent auth={true}><RoleMng /></WrapperRouteComponent>,
            },
            {
              path: "role",
              element: <WrapperRouteComponent auth={true}><RoleMng /></WrapperRouteComponent>,
            },
            {
              path: "user",
              element: <WrapperRouteComponent auth={true}><UserMng /></WrapperRouteComponent>,
            },
            {
              path: "operateLog",
              element: <WrapperRouteComponent auth={true}><OperateLog /></WrapperRouteComponent>,
            },
            {
              path: "noticeMng",
              element: <WrapperRouteComponent auth={true}><NoticeMng /></WrapperRouteComponent>,
            },
          ]
        },
        {
          path: "storeMng",
          element: <WrapperRouteComponent><SubLayout /></WrapperRouteComponent>,
          children: [
            {
              path: "/storeMng",
              element: <WrapperRouteComponent><Associate /></WrapperRouteComponent>,
            },
            {
              path: "associate",
              element: <WrapperRouteComponent><Associate /></WrapperRouteComponent>,
            },
            {
              path: "shopList",
              element: <WrapperRouteComponent><ShopList /></WrapperRouteComponent>,
            },
            {
              path: "shopDetail",
              element: <WrapperRouteComponent><ShopDetail /></WrapperRouteComponent>,
            },
          ],
        },
        {
          path: "businessMng",
          element: <WrapperRouteComponent><SubLayout /></WrapperRouteComponent>,
          children: [
            {
              path: "/businessMng",
              element: <WrapperRouteComponent><ReportList /></WrapperRouteComponent>,
            },
            {
              path: "reportList",
              element: <WrapperRouteComponent><ReportList /></WrapperRouteComponent>,
            },
            {
              path: "rankList",
              element: <WrapperRouteComponent><RankList /></WrapperRouteComponent>,
            },
          ]
        },
        {
          path: "/setting/updatePass",
          element: <WrapperRouteComponent auth={true}><UpdatePass /></WrapperRouteComponent>,
        },
      ],
    },
    {
      path: "login",
      element: <LoginPage />,
    },
    {
      path: "*",
      element: <WrapperRouteComponent><NotFound /></WrapperRouteComponent>,
    },
];

const RenderRouter: FC = () => {
  const element = useRoutes(routeList);
  return element;
};

export default RenderRouter;
