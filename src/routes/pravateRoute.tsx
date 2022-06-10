import React, { FC, useEffect } from 'react';
import { Route, useNavigate } from 'react-router-dom';
import { Result, Button } from 'antd';
import { useLocale } from '@/locales';
import { Navigate, RouteProps, useLocation } from 'react-router';
import { useRecoilState } from 'recoil';
import { userState } from "@/stores/recoilState";

const PrivateRoute: FC<RouteProps> = ({children}) => {
  const [user, setUser] = useRecoilState(userState);
  console.log('user: ', user);
  const logged = user.userName? true: false;
  console.log('userName: ', user.userName, logged);
  const navigate = useNavigate();
  const { formatMessage } = useLocale();
  const location = useLocation();
  return logged ? <>{children}</> : <Navigate to="/login" />
};

export default PrivateRoute;
