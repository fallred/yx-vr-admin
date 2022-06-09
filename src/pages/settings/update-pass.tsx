import React, { FC } from "react";
import { Button, Checkbox, Form, Input } from "antd";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useRecoilState } from 'recoil';
import { userState } from "@/stores/recoilState";
import { IUpdatePassParams } from "@/models/setting";
import { Location } from "history";
import { useUpdatePass } from "@/api";
import LogoIcon from "@/assets/logo/logo.png";
import styles from "./index.module.less";
import { ReactComponent as LogoSvg } from "@/assets/logo/logo.svg";

const initialValues: IUpdatePassParams = {
    oldpwd: '',
    newpwd: '',
    renewpwd: ''
};

const LoginForm: FC = () => {
  const updatePassMutation = useUpdatePass();
  const navigate = useNavigate();
  const location = useLocation() as Location<{ from: string }>;
  const [user, setUser] = useRecoilState(userState);
  const onFinished = async (form: IUpdatePassParams) => {
    const result = await updatePassMutation.mutateAsync(form);
    console.log("result: ", result);

    if (result) {
      setUser({
        logged: false
      });
      const from = location.state?.from || { pathname: "/login" };
      navigate(from);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.main}>
        <Form<IUpdatePassParams> onFinish={onFinished} initialValues={initialValues}>
          <Form.Item
            name="oldpwd"
            rules={[{ required: true, message: "请输入旧密码！" }]}
          >
            <Input type="password" size="large" placeholder="旧密码" />
          </Form.Item>
          <Form.Item
            name="newpwd"
            rules={[{ required: true, message: "请输入新密码！" }]}
          >
            <Input type="password" size="large" placeholder="新密码" />
          </Form.Item>
          <Form.Item
            name="renewpwd"
            rules={[{ required: true, message: "请输入确认密码！" }]}
          >
            <Input type="password" size="large" placeholder="确认密码" />
          </Form.Item>
          <Form.Item>
            <Button
              size="large"
              className={styles.mainLoginBtn}
              htmlType="submit"
              type="primary"
            >
              确定
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default LoginForm;
