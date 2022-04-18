import React, { FC } from 'react';
import { Spin, Alert } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

const SuspendFallbackLoading: FC = () => {
  return (
    <div className="yx-app-loading">
      <Spin tip="加载中..." indicator={antIcon}/>
    </div>,
  );
};

export default SuspendFallbackLoading;
