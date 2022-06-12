import React, { useEffect, useRef, useState } from "react";
import { Modal, Form, Input, Drawer, Space, Button } from "antd";
import {IShopStore, ShopStoreStatusEnum} from '@/models/shop-store';
import ShopTableCard from '@/pages/store-mng/shop-table-card';
import {ShopStoreStatusMap} from '@/enums/common';

interface ShopSetDrawerProps {
    visible: boolean;
    onSubmit: (values: IShopStore) => void;
    onCancel: () => void;
  }

const ShopSetDrawer: FC<ShopSetDrawerProps> = props => {
    const shopTableRef = useRef<React.Component>(null);
    const { visible, onCancel, onSubmit } = props;
    const handleSubmit = () => {
        const shopListSelectedRows = shopTableRef?.current?.getValue();
        console.log('shopListSelectedRows:', shopListSelectedRows);
        const appIdArr = shopListSelectedRows.map(item => item.appId);
        if (shopListSelectedRows.length === 0) {
            message.error("请选择门店！");
            return;
        }
        if (onSubmit) {
            onSubmit({
                appIds: appIdArr,
                userId: '',
            });
        }
    };
    const handleCancel = () => {
        // console.log('handleCancel clearShopTableSelectedRows:');
        shopTableRef?.current?.clearShopTableSelectedRows();
        onCancel();
    };
    return (
        <Drawer
            className="shop-set-drawer"
            title="数据权限设置"
            width={800}
            onClose={handleCancel}
            visible={visible}
            bodyStyle={{ paddingBottom: 0 }}
            extra={
                <Space>
                  <Button onClick={handleCancel}>取消</Button>
                  <Button onClick={handleSubmit} type="primary">保存</Button>
                </Space>
            }
        >
            {
                visible ? 
                <ShopTableCard
                    filterType=""
                    showSearch={false}
                    showTableTitle={false}
                    shopTableRef={shopTableRef}
                /> : null
            }
            
        </Drawer>
    );
};

export default ShopSetDrawer;