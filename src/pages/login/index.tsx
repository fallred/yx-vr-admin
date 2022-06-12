import React, { FC } from "react";
import { Button, Checkbox, Form, Input } from "antd";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useRecoilState } from 'recoil';
import { userState } from "@/stores/recoilState";
import { LoginParams } from "@/models/login";
// import { loginAsync } from '@/stores/user.store';
// import { useAppDispatch } from '@/stores';
import { Location } from "history";
import { useLogin } from "@/api";
import LogoIcon from "@/assets/logo/logo.png";
import styles from "./index.module.less";
import { ReactComponent as LogoSvg } from "@/assets/logo/logo.svg";

const initialValues: LoginParams = {
  username: "guest",
  password: "guest",
  verifycode: ""
  // remember: true
};

const LoginForm: FC = () => {
  const loginMutation = useLogin();
  const navigate = useNavigate();
  const location = useLocation() as Location<{ from: string }>;
  const [user, setUser] = useRecoilState(userState);
  // const dispatch = useAppDispatch();

  const onFinished = async (form: LoginParams) => {
    const result = await loginMutation.mutateAsync(form);
    console.log("result: ", result);
    if (result) {
      setUser({
        ...user,
        ...result,
        logged: true,
      });
      localStorage.setItem("accessToken", result.token.accessToken);
      localStorage.setItem("userName", result.userName);
      localStorage.setItem("userAccount", result.userAccount);
      localStorage.setItem("appId", result.appId);
      localStorage.setItem("identity_type", result.identity_type);
      // localStorage.setItem("apps", JSON.stringify(result.apps));
      const from = location.state?.from || { pathname: "/home" };
      navigate(from);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <div className={styles.header}>
          <Link to="/">
            <img className={styles.logo} src={LogoIcon} />
            <span className={styles.title}>影行科技</span>
          </Link>
        </div>
        <div className={styles.desc}>是一家VR游戏公司</div>
      </div>
      <div className={styles.main}>
        <Form<LoginParams> onFinish={onFinished} initialValues={initialValues}>
          <Form.Item
            name="username"
            rules={[{ required: true, message: "请输入用户名！" }]}
          >
            <Input size="large" placeholder="用户名" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "请输入密码！" }]}
          >
            <Input type="password" size="large" placeholder="密码" />
          </Form.Item>
          <Form.Item name="remember" valuePropName="checked">
            <Checkbox>记住用户</Checkbox>
          </Form.Item>
          <Form.Item>
            <Button
              size="large"
              className={styles.mainLoginBtn}
              htmlType="submit"
              type="primary"
            >
              登录
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default LoginForm;
