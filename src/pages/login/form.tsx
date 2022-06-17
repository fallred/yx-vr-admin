import React, { FC, useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { Location } from 'history';
import { useRecoilState } from 'recoil';
import { message, Space, Tabs } from 'antd';
import {
    AlipayCircleOutlined,
    LockOutlined,
    MobileOutlined,
    TaobaoCircleOutlined,
    UserOutlined,
    WeiboCircleOutlined,
} from '@ant-design/icons';
import {
    LoginForm,
    ProFormCaptcha,
    ProFormCheckbox,
    ProFormText,
} from '@ant-design/pro-components';
// import type { CSSProperties } from 'react';
import { userState } from '@/stores/recoilState';
import { useLogin } from '@/api';
import { LoginParams } from '@/models/login';
import LogoIcon from '@/assets/logo/logo-2.png';
import styles from './index.module.less';
  
type LoginType = 'phone' | 'account';

const initialValues: LoginParams = {
username: '',
password: '',
verifycode: ''
// remember: true
};
//   const iconStyles: CSSProperties = {
//     marginLeft: '16px',
//     color: 'rgba(0, 0, 0, 0.2)',
//     fontSize: '24px',
//     verticalAlign: 'middle',
//     cursor: 'pointer',
//   };
  
const LoginFormComp: FC = () => {
    const loginMutation = useLogin();
    const navigate = useNavigate();
    const location = useLocation() as Location<{ from: string }>;
    const [user, setUser] = useRecoilState(userState);
    const [loginType, setLoginType] = useState<LoginType>('account');
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
        <LoginForm<LoginParams>
            onFinish={onFinished}
            initialValues={initialValues}
            logo={LogoIcon}
            title="影行科技"
            subTitle="是一家VR游戏公司"
            actions={
                <Space>
                  其他登录方式
                  {/* <AlipayCircleOutlined style={iconStyles} />
                  <TaobaoCircleOutlined style={iconStyles} />
                  <WeiboCircleOutlined style={iconStyles} /> */}
                </Space>
            }
        >
          <Tabs activeKey={loginType} onChange={(activeKey) => setLoginType(activeKey as LoginType)}>
            <Tabs.TabPane key={'account'} tab={'账号密码登录'} />
            {/* <Tabs.TabPane key={'phone'} tab={'手机号登录'} /> */}
          </Tabs>
          {loginType === 'account' && (
            <>
              <ProFormText
                name="username"
                fieldProps={{
                  size: 'large',
                  prefix: <UserOutlined className={'prefixIcon'} />,
                }}
                placeholder={'用户名'}
                rules={[
                  {
                    required: true,
                    message: '请输入用户名!',
                  },
                ]}
              />
              <ProFormText.Password
                name="password"
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined className={'prefixIcon'} />,
                }}
                placeholder={'密码'}
                rules={[
                  {
                    required: true,
                    message: '请输入密码！',
                  },
                ]}
              />
            </>
          )}
          {loginType === 'phone' && (
            <>
              <ProFormText
                fieldProps={{
                  size: 'large',
                  prefix: <MobileOutlined className={'prefixIcon'} />,
                }}
                name="mobile"
                placeholder={'手机号'}
                rules={[
                  {
                    required: true,
                    message: '请输入手机号！',
                  },
                  {
                    pattern: /^1\d{10}$/,
                    message: '手机号格式错误！',
                  },
                ]}
              />
              <ProFormCaptcha
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined className={'prefixIcon'} />,
                }}
                captchaProps={{
                  size: 'large',
                }}
                placeholder={'请输入验证码'}
                captchaTextRender={(timing, count) => {
                  if (timing) {
                    return `${count} ${'获取验证码'}`;
                  }
                  return '获取验证码';
                }}
                name="captcha"
                rules={[
                  {
                    required: true,
                    message: '请输入验证码！',
                  },
                ]}
                onGetCaptcha={async () => {
                  message.success('获取验证码成功！验证码为：1234');
                }}
              />
            </>
          )}
          <div
            style={{
              marginBottom: 24,
            }}
          >
            <ProFormCheckbox noStyle name="autoLogin">
              自动登录
            </ProFormCheckbox>
            <a
              style={{
                float: 'right',
              }}
            >
              忘记密码
            </a>
          </div>
        </LoginForm>
      </div>
    );
};

export default LoginFormComp;