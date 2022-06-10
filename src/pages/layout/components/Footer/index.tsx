import React from 'react';
import { GithubOutlined } from '@ant-design/icons';
import { DefaultFooter } from '@ant-design/pro-layout';

export default () => (
  <DefaultFooter
    copyright="2022影行科技"
    links={[
      {
        key: '1',
        title: '影行科技管理平台',
        blankTarget: true,
        href: '',
      },
    ]}
  />
);
