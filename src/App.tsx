import React, { Suspense, useEffect, useMemo } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ConfigProvider } from "antd";
import { IntlProvider } from "react-intl";
import { createBrowserHistory } from "history";
import { useRecoilState } from "recoil";

import enUS from "antd/es/locale/en_US";
import zhCN from "antd/es/locale/zh_CN";
import moment from "moment";
import "moment/dist/locale/zh-cn";
import { localeConfig } from "@/config/locale";
import { useGetCurrentUser } from "@/api";
import { userState } from "@/stores/recoilState";
import RenderRouter from "./routes";
import "./App.less";

moment.locale("zh-cn");

const history = createBrowserHistory();

const App: React.FC = () => {
  const [user, setUser] = useRecoilState(userState);
  // const { locale } = user;
 
  useEffect(() => {
    debugger;
    console.log('user.locale:', user.locale);
    console.log('user.locale.toLowerCase:', user.locale.toLowerCase());
    const lang = user?.locale?.toLowerCase();
    moment.locale(lang);
  }, [user.locale]);

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
        <BrowserRouter basename="/vrAdmin">
          <RenderRouter />
        </BrowserRouter>
      </IntlProvider>
    </ConfigProvider>
  );
};

export default App;
