import React, { FC, useEffect, useState, useRef } from "react";
import { Empty, Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

interface IWithLoadProps {
    isLoading: boolean;
    list: Array;
}

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

export default function WithCompLoad(Component) {
    return function LoadComp(props: IWithLoadProps) {
        if (props.isLoading) {
            return  <React.Fragment><Spin indicator={antIcon} />加载中...</React.Fragment>;
        }
        if (!props.isLoading && props.list.length === 0) {
            return <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />;
        }

        return <Component {...props} />;

    };
}
