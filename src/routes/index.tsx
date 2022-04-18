import React, { lazy, FC } from "react";
import { useRoutes, RouteObject } from "react-router-dom";

import LoginPage from "@/pages/login";
import LayoutPage from "@/pages/layout";
import Notification from "@/pages/notification";
import WrapperRouteComponent from "./config";

const NotFound = lazy(() => import('@/pages/404'));
const Project = lazy(() => import('@/pages/project'));

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
        path: "/system",
        element: <WrapperRouteComponent><Notification /></WrapperRouteComponent>,
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
