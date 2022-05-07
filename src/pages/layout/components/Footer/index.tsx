import React from 'react';
import { GithubOutlined } from '@ant-design/icons';
import { DefaultFooter } from '@ant-design/pro-layout';

export default () => (
  <DefaultFooter
    copyright="2022 影行科技"
    links={[
      // {
      //   key: '影行科技',
      //   title: '影行科技',
      //   blankTarget: true,
      //   href: '',
      // },
      // {
      //   key: 'github',
      //   title: <GithubOutlined />,
      //   href: 'https://github.com/ychengcloud/react-antd-vite-admin',
      //   blankTarget: true,
      // },
      {
        key: '影行科技管理平台',
        title: '影行科技管理平台',
        blankTarget: true,
        href: '',
      },
    ]}
  />
);
