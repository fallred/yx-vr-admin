import React, { useEffect, useRef, useState } from "react";
import { Drawer, List, Avatar, Divider, Col, Row, Rate, Descriptions } from 'antd';
import type { ProColumns } from '@ant-design/pro-components';
import {ProTable, ProDescriptions} from '@ant-design/pro-components';
import {IUser} from '@/models/user-mng';
import {IShopStore, ShopStoreStatusEnum} from '@/models/shop-store';
import {ShopStoreStatusMap} from '@/enums/common';

interface OperationDrawerProps {
    visible: boolean;
    current: Partial<IUser> | undefined;
    onClose: () => void;
}

const StoreItem: FC<OperationDrawerProps> = (props) => {
    const {store} = props;
    const addressFormat = () => {
        const addrInfo = [
            store.province ?? '--',
            store.city ?? '--',
            store.district ?? '',
            store.address ?? ''
        ];
        return addrInfo.join('-');
    };
    return (
        <Descriptions title={store.appId} key={store.appId}>
            <Descriptions.Item label="门店名称">{store.nm}</Descriptions.Item>
            <Descriptions.Item label="门店编码">{store.code}</Descriptions.Item>
            <Descriptions.Item label="地址">{addressFormat()}</Descriptions.Item>
            <Descriptions.Item label="加盟商">{store.franchisee}</Descriptions.Item>
            <Descriptions.Item label="店长">{store.manager}</Descriptions.Item>
            <Descriptions.Item label="合伙人">{store.partner}</Descriptions.Item>
            <Descriptions.Item label="状态">
                {ShopStoreStatusMap.get(store.status)}
            </Descriptions.Item>
            <Descriptions.Item label="评级">
                <Rate allowHalf disabled value={store.grade} />
            </Descriptions.Item>
            <Descriptions.Item label="签约时间">
                {store.tm}
            </Descriptions.Item>
        </Descriptions>
      )
};

const StoreDescriptions: FC<OperationDrawerProps> = (props) => {
    const {store} = props;
    const columns: ProColumns<IShopStore>[] = [
        {
          key: 'appId',
          title: '门店编号',
          dataIndex: 'appId',
          valueType: 'text',
          width: 120,
        },
        {
          key: 'nm',
          title: '门店名称',
          dataIndex: "nm",
          valueType: "text",
          ellipsis: true,
          width: 150,
        },
        {
          key: 'code',
          title: '门店编码',
          dataIndex: 'code',
          valueType: 'text',
          width: 140,
        },
        {
          key: 'province',
          title: '省',
          dataIndex: "province",
          valueType: "text",
          width: 100,
        },
        {
          key: 'city',
          title: '市',
          dataIndex: "city",
          valueType: "text",
          width: 100,
        },
        {
          key: 'district',
          title: '区',
          dataIndex: "district",
          valueType: "text",
          width: 100,
        },
        {
          key: 'address',
          title: '详细地址',
          dataIndex: "address",
          valueType: "textarea",
          width: 100,
        },
        // {
        //   key: 'franchisee',
        //   title: '加盟商',
        //   dataIndex: "franchisee",
        //   valueType: "text",
        //   width: 100,
        // },
        // {
        //   key: 'manager',
        //   title: '店长',
        //   dataIndex: "manager",
        //   valueType: "text",
        //   width: 100,
        // },
        {
          title: '状态',
          width: 80,
          dataIndex: "status",
          valueEnum: {
            [ShopStoreStatusEnum.NORMAL]: { text: ShopStoreStatusMap.get(ShopStoreStatusEnum.NORMAL)},
            [ShopStoreStatusEnum.DISABLED]: { text: ShopStoreStatusMap.get(ShopStoreStatusEnum.DISABLED)},
          },
        },
        {
          title: '门店评级',
          dataIndex: "grade",
          valueType: "rate",
          width: 200,
          // copyable: true,
        },
        {
          title: '合伙人',
          dataIndex: 'partner',
          valueType: 'text',
          with: 120,
        },
        // {
        //   title: '签约时间',
        //   dataIndex: 'tm',
        //   valueType: 'time',
        //   with: 120,
        // },
    ];
    return (
        <ProDescriptions
            title={store.appId}
            dataSource={store}
            columns={columns}
        >
            <ProDescriptions.Item dataIndex="percent" label="百分比" valueType="percent">
                100
            </ProDescriptions.Item>
        </ProDescriptions>
    );
};

const StoreTable: FC<OperationDrawerProps> = (props) => {
    const {apps} = props;
    const columns: ProColumns<IShopStore>[] = [
        {
          key: 'appId',
          title: '门店编号',
          dataIndex: 'appId',
          valueType: 'text',
          width: 120,
        },
        {
          key: 'nm',
          title: '门店名称',
          dataIndex: "nm",
          valueType: "text",
          ellipsis: true,
          width: 150,
        },
        {
          key: 'code',
          title: '门店编码',
          dataIndex: 'code',
          valueType: 'text',
          width: 140,
        },
        {
          key: 'province',
          title: '省',
          dataIndex: "province",
          valueType: "text",
          width: 100,
        },
        {
          key: 'city',
          title: '市',
          dataIndex: "city",
          valueType: "text",
          width: 100,
        },
        {
          key: 'district',
          title: '区',
          dataIndex: "district",
          valueType: "text",
          width: 100,
        },
        {
          key: 'address',
          title: '详细地址',
          dataIndex: "address",
          valueType: "textarea",
          width: 100,
        },
        // {
        //   key: 'franchisee',
        //   title: '加盟商',
        //   dataIndex: "franchisee",
        //   valueType: "text",
        //   width: 100,
        // },
        // {
        //   key: 'manager',
        //   title: '店长',
        //   dataIndex: "manager",
        //   valueType: "text",
        //   width: 100,
        // },
        {
          title: '状态',
          width: 80,
          dataIndex: "status",
          valueEnum: {
            [ShopStoreStatusEnum.NORMAL]: { text: ShopStoreStatusMap.get(ShopStoreStatusEnum.NORMAL)},
            [ShopStoreStatusEnum.DISABLED]: { text: ShopStoreStatusMap.get(ShopStoreStatusEnum.DISABLED)},
          },
        },
        {
          title: '门店评级',
          dataIndex: "grade",
          valueType: "rate",
          width: 200,
        },
        {
          title: '合伙人',
          dataIndex: 'partner',
          valueType: 'text',
          with: 120,
        },
        // {
        //   title: '签约时间',
        //   dataIndex: 'tm',
        //   valueType: 'time',
        //   with: 120,
        // },
    ];
    return (
        <ProTable<IShopStore>
            rowKey="appId"
            headerTitle="门店权限列表"
            scroll={{ x: 1300 }}
            options={{reload: false}}
            request={undefined}
            dataSource={apps}
            columns={columns}
            search={false}
            hideOnSinglePage={true}
            tableAlertOptionRender={false}
            defaultSize="small"
        />
    );
};
const StoreListDrawer: FC<OperationDrawerProps> = (props) => {
    const { visible, current, onClose } = props;
    const {apps = []} = current ?? {};
    // const getStoreList = () => {
    //     const list = [];
    //     for(let store of apps) {
    //         list.push(<StoreDescriptions key={store.appId} store={store} />);
    //     }
    //     return list;
    // };
    return (
        <Drawer
            className="storeDrawer"
            title="查看数据权限"
            width={700}
            onClose={onClose}
            visible={visible}
            bodyStyle={{ paddingBottom: 80 }}
        >
            <StoreTable apps={apps} />
        </Drawer>
    );
};

export default StoreListDrawer;