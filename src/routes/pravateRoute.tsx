import React, { FC, useEffect } from 'react';
import { Route, useNavigate } from 'react-router-dom';
import { Result, Button } from 'antd';
import { useLocale } from '@/locales';
import { Navigate, RouteProps, useLocation } from 'react-router';
import { useRecoilState } from 'recoil';
import { userState } from "@/lib/recoilState";
import { createBrowserHistory } from "history";

const PrivateRoute: FC<RouteProps> = ({children}) => {
const history = createBrowserHistory();

  const [user, setUser] = useRecoilState(userState);

  console.log('user: ', user);
  const logged = user.userName? true: false;
  console.log('userName: ', user.userName, logged);
  const navigate = useNavigate();
  const { formatMessage } = useLocale();
  const location = useLocation();

  return logged ? (
    <div>{children}</div>
  ) : <Navigate to="/login" />
};

export default PrivateRoute;
