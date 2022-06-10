import React, { Suspense, useEffect, useMemo } from "react";
import { BrowserRouter, Route, Routes, HashRouter } from "react-router-dom";
import { ConfigProvider } from "antd";
import { IntlProvider } from "react-intl";
import { createBrowserHistory } from "history";
import { useRecoilState } from "recoil";

import enUS from "antd/lib/locale/en_US";
import zhCN from "antd/lib/locale/zh_CN";
import moment from "moment";
import 'moment/locale/zh-cn';
import 'antd/dist/antd.css';

import { localeConfig } from "@/config/locale";
import { useGetCurrentUser, useGetSystemMenuTree, useGetUserMenuTree } from "@/api";
import recoilService from '@/stores/recoilService';
import { userState } from "@/stores/recoilState";
import RenderRouter from "./routes";
import "./App.less";

moment.locale("zh-cn");

const history = createBrowserHistory();

const App: React.FC = () => {
  const { data: userMenuTree, error: error1 } = useGetUserMenuTree();
  const { data: systemMenuTree, error: error2 } = useGetSystemMenuTree();
  const [user, setUser] = useRecoilState(userState);
  // const { locale } = user;
 
  useEffect(() => {
    console.log('user.locale:', user.locale);
    console.log('user.locale.toLowerCase:', user.locale.toLowerCase());
    const lang = user?.locale?.toLowerCase();
    moment.locale(lang);
  }, [user.locale]);

  useEffect(() => {
    recoilService.getSystemMenuTree(systemMenuTree);
  }, [systemMenuTree]);
  useEffect(() => {
    recoilService.getUserMenuTree(userMenuTree);
  }, [userMenuTree]);

  const getAntdLocale = () => {
    const lang = user?.locale?.toLowerCase();
    if (lang === "en-us") {
      return enUS;
    } else if (lang === "zh-cn") {
      return zhCN;
    }
  };

  const getLocale = () => {
    const lang = localeConfig.find((item) => {
      return item.key === user.locale.toLowerCase();
    });

    return lang?.messages;
  };

  return (
      <ConfigProvider locale={getAntdLocale()} componentSize="middle">
        <IntlProvider locale={user.locale.split("-")[0]} messages={getLocale()}>
          <HashRouter>
            <RenderRouter />
          </HashRouter>
        </IntlProvider>
      </ConfigProvider>
  );
};

export default App;
